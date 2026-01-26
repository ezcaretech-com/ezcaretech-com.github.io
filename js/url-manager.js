// js/url-manager.js
(function(window) {
  'use strict';

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
     * URL 파싱 (Path 방식 + 쿼리스트링 둘 다 지원)
     */
    parseURL: function(filterOptions) {
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
      return {
        customer: params.get('customer') || null,
        appType: params.get('appType') || null,
        platform: params.get('platform') || null,
        environment: params.get('env') || null,
        search: params.get('search') || ''
      };
    },

    /**
     * Path URL 파싱
     */
    parsePathURL: function(path, filterOptions) {
      var self = this;
      var filters = {
        customer: null,
        appType: null,
        platform: null,
        environment: null,
        search: ''
      };

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
        var key = segments[i];
        var value = segments[i + 1];
        
        if (!value) continue;
        
        // slug를 원래 값으로 매칭
        switch (key) {
          case 'category':
          case 'customer':
            if (filterOptions && filterOptions.customer) {
              filters.customer = self.matchSlug(value, filterOptions.customer);
            } else {
              filters.customer = decodeURIComponent(value.replace(/-/g, ' '));
            }
            break;
          case 'tag':
          case 'appType':
            if (filterOptions && filterOptions.appType) {
              filters.appType = self.matchSlug(value, filterOptions.appType);
            } else {
              filters.appType = decodeURIComponent(value.replace(/-/g, ' '));
            }
            break;
          case 'platform':
            filters.platform = value.toUpperCase();
            break;
          case 'env':
          case 'environment':
            if (filterOptions && filterOptions.environment) {
              filters.environment = self.matchSlug(value, filterOptions.environment);
            } else {
              filters.environment = decodeURIComponent(value.replace(/-/g, ' '));
            }
            break;
        }
      }

      return filters;
    },

    /**
     * 필터를 Path URL로 변환 (slug 사용)
     */
    filtersToPathURL: function(filters) {
      var self = this;
      var parts = [];
      
      if (filters.customer) {
        parts.push('category', self.toSlug(filters.customer));
      }
      if (filters.appType) {
        parts.push('tag', self.toSlug(filters.appType));
      }
      if (filters.platform) {
        parts.push('platform', filters.platform.toLowerCase());
      }
      if (filters.environment) {
        parts.push('env', self.toSlug(filters.environment));
      }
      
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
     */
    onURLChange: function(callback) {
      window.addEventListener('popstate', function(e) {
        var filters = URLManager.parseURL();
        callback(filters);
      });
    }
  };

  window.URLManager = URLManager;

})(window);