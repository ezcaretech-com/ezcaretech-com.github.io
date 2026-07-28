// js/url-manager.js
(function(window) {
  'use strict';

  /**
   * 필터 정의는 /assets/filter-config.json 에 있고 FilterManager 가 로드한다.
   * URLManager 는 호출 시점에 그 설정을 읽어 쓴다.
   */
  function filterDefs() {
    var FM = window.FilterManager;
    var config = (FM && FM.getConfig) ? FM.getConfig() : null;
    return (config && config.filters) || [];
  }

  /**
   * 필터별 URL 규칙 (설정에 url 이 없으면 key 를 그대로 사용)
   * - segment : URL 을 만들 때 쓰는 경로 이름  (/category/gbc 의 'category')
   * - aliases : URL 을 읽을 때 추가로 허용할 이름
   * - query   : 쿼리스트링 파라미터 이름
   * - match   : 'slug'  → 슬러그로 쓰고 원래 값으로 되돌림
   *             'upper' → 소문자로 쓰고 대문자로 되돌림 (platform)
   */
  function urlSpec(filter) {
    var spec = filter.url || {};
    return {
      key: filter.key,
      segment: spec.segment || filter.key,
      aliases: spec.aliases || [],
      query: spec.query || filter.key,
      match: spec.match || 'slug'
    };
  }

  /**
   * 경로 이름(별칭 포함) → URL 규칙
   */
  function specsBySegment() {
    var map = {};
    filterDefs().forEach(function(filter) {
      var spec = urlSpec(filter);
      map[spec.segment] = spec;
      spec.aliases.forEach(function(alias) {
        map[alias] = spec;
      });
    });
    return map;
  }

  /**
   * 설정된 필터 키를 모두 가진 빈 필터 객체
   */
  function emptyFilters() {
    var filters = {};
    filterDefs().forEach(function(filter) {
      filters[filter.key] = null;
    });
    filters.search = '';
    return filters;
  }

  var URLManager = {
    /**
     * 문자열을 slug로 변환 (공백 → 하이픈, 소문자)
     */
    toSlug: function(str) {
      if (!str) return '';
      return str.toLowerCase()
        .replace(/\s+/g, '-')      // 공백 → 하이픈
        .replace(/[^\w\-]/g, '')   // 특수문자 제거
        .replace(/\-\-+/g, '-');   // 중복 하이픈 제거
    },

    /**
     * slug를 원래 값과 매칭
     */
    matchSlug: function(slug, originalValues) {
      if (!slug || !originalValues) return null;

      var slugLower = slug.toLowerCase().replace(/-/g, '');

      for (var i = 0; i < originalValues.length; i++) {
        var original = originalValues[i];
        var originalSlug = original.toLowerCase().replace(/\s+/g, '').replace(/-/g, '');

        if (slugLower === originalSlug) {
          return original;
        }
      }

      return null;
    },

    /**
     * URL 값 → 필터 값
     */
    decodeValue: function(spec, raw, filterOptions) {
      if (spec.match === 'upper') {
        return decodeURIComponent(raw).toUpperCase();
      }

      // 실제 옵션 목록이 있으면 슬러그를 원래 값으로 매칭 (없는 값이면 null)
      if (filterOptions && filterOptions[spec.key]) {
        return this.matchSlug(raw, filterOptions[spec.key]);
      }

      return decodeURIComponent(raw.replace(/-/g, ' '));
    },

    /**
     * 필터 값 → URL 값
     */
    encodeValue: function(spec, value) {
      if (spec.match === 'upper') {
        return String(value).toLowerCase();
      }
      return this.toSlug(value);
    },

    /**
     * URL 파싱 (Path 방식 + 쿼리스트링 둘 다 지원)
     */
    parseURL: function(filterOptions) {
      var self = this;
      var params = new URLSearchParams(window.location.search);

      // 404.html에서 리다이렉트된 경우
      var redirectedPath = params.get('_path');
      if (redirectedPath) {
        var parsed = this.parsePathURL(redirectedPath, filterOptions);
        // URL 정리
        var cleanURL = this.filtersToPathURL(parsed);
        window.history.replaceState(null, '', cleanURL || '/');
        return parsed;
      }

      // Path 방식 체크
      var pathname = window.location.pathname;
      if (pathname && pathname !== '/' && pathname !== '/index.html') {
        return this.parsePathURL(pathname, filterOptions);
      }

      // 쿼리스트링 방식
      var filters = emptyFilters();
      filterDefs().forEach(function(filter) {
        var spec = urlSpec(filter);
        var raw = params.get(spec.query);
        if (!raw) return;

        // 값을 그대로 쓰되, 옵션 목록에 없으면 슬러그 매칭도 시도
        var value = self.decodeValue(spec, raw, null);
        var available = filterOptions ? filterOptions[spec.key] : null;
        if (available && available.indexOf(value) === -1) {
          value = self.matchSlug(raw, available) || value;
        }

        filters[filter.key] = value;
      });
      filters.search = params.get('search') || '';

      return filters;
    },

    /**
     * Path URL 파싱
     */
    parsePathURL: function(path, filterOptions) {
      var self = this;
      var filters = emptyFilters();
      var specs = specsBySegment();

      var parts = path.split('?');
      var pathname = parts[0];

      // 쿼리스트링에서 search 추출
      if (parts[1]) {
        var searchParams = new URLSearchParams(parts[1]);
        filters.search = searchParams.get('search') || '';
      }

      var segments = pathname.split('/').filter(function(s) {
        return s && s !== 'index.html';
      });

      for (var i = 0; i < segments.length; i += 2) {
        var name = segments[i];
        var value = segments[i + 1];

        if (!value) continue;

        var spec = specs[name];
        if (!spec) continue;

        filters[spec.key] = self.decodeValue(spec, value, filterOptions);
      }

      return filters;
    },

    /**
     * 필터를 Path URL로 변환 (설정된 순서대로)
     */
    filtersToPathURL: function(filters) {
      var self = this;
      var parts = [];

      filterDefs().forEach(function(filter) {
        var value = filters[filter.key];
        if (!value) return;

        var spec = urlSpec(filter);
        parts.push(spec.segment, self.encodeValue(spec, value));
      });

      if (parts.length === 0) {
        return '/';
      }

      var url = '/' + parts.join('/');

      if (filters.search) {
        url += '?search=' + encodeURIComponent(filters.search);
      }

      return url;
    },

    /**
     * 브라우저 URL 업데이트
     */
    updateBrowserURL: function(filters, replace) {
      var url = this.filtersToPathURL(filters);

      if (replace) {
        window.history.replaceState({ filters: filters }, '', url);
      } else {
        window.history.pushState({ filters: filters }, '', url);
      }
    },

    /**
     * URL 변경 감지
     * filterOptions 를 넘겨야 뒤로가기 시 슬러그가 원래 값으로 복원된다.
     */
    onURLChange: function(callback, filterOptions) {
      window.addEventListener('popstate', function(e) {
        var filters = URLManager.parseURL(filterOptions);
        callback(filters);
      });
    }
  };

  window.URLManager = URLManager;

})(window);
