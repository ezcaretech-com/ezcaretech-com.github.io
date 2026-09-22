// js/filter-manager.js
(function(window) {
  'use strict';

  // 필터 설정 파일 (필터 목록 / 추출 규칙 / UI 문구)
  var CONFIG_URL = '/assets/filter-config.json?v=1';

  // 설정 로드 실패 시에도 스크립트가 죽지 않도록 하는 빈 설정
  var EMPTY_CONFIG = { filters: [], rules: {}, badges: {}, ui: {} };

  var config = EMPTY_CONFIG;

  /**
   * 설정 파일 로드
   */
  function loadConfig(url) {
    return fetch(url || CONFIG_URL)
      .then(function(response) {
        if (!response.ok) throw new Error('HTTP ' + response.status);
        return response.json();
      })
      .then(function(json) {
        config = {
          filters: json.filters || [],
          rules: json.rules || {},
          badges: json.badges || {},
          ui: json.ui || {}
        };
        return config;
      })
      .catch(function(err) {
        console.error('[FilterManager] 필터 설정을 불러오지 못했습니다:', err);
        config = EMPTY_CONFIG;
        return config;
      });
  }

  /**
   * 설정된 필터 목록
   */
  function filters() {
    return config.filters || [];
  }

  /**
   * UI 문구 조회 (없으면 기본값)
   */
  function text(key, fallback) {
    var value = (config.ui || {})[key];
    return (value === undefined || value === null) ? fallback : value;
  }

  /**
   * 규칙의 contains 조건과 앱이 매치되는지 확인
   * - 필드(name / id) 간에는 OR, 각 필드의 패턴들도 OR
   */
  function matchesRule(app, contains, ignoreCase) {
    if (!contains) return false;

    for (var field in contains) {
      if (!Object.prototype.hasOwnProperty.call(contains, field)) continue;

      var value = app[field] == null ? '' : String(app[field]);
      if (ignoreCase) value = value.toLowerCase();

      var patterns = contains[field] || [];
      for (var i = 0; i < patterns.length; i++) {
        var pattern = ignoreCase ? String(patterns[i]).toLowerCase() : String(patterns[i]);
        if (pattern && value.indexOf(pattern) !== -1) return true;
      }
    }

    return false;
  }

  /**
   * 규칙 기반 값 추출 (customer / appType / environment)
   */
  function extractByRule(app, key) {
    var rule = (config.rules || {})[key];
    if (!rule) return '';

    var matches = rule.matches || [];
    for (var i = 0; i < matches.length; i++) {
      if (matchesRule(app, matches[i].contains, rule.ignoreCase === true)) {
        return matches[i].value;
      }
    }

    return rule.fallback || '';
  }

  var FilterManager = {
    /**
     * 설정 파일 로드 (다른 URL로 재로드 가능)
     */
    loadConfig: function(url) {
      return loadConfig(url);
    },

    /**
     * 현재 설정 반환
     */
    getConfig: function() {
      return config;
    },

    /**
     * 앱에서 필터 값 추출 (규칙 기반)
     */
    extractValue: function(app, key) {
      return extractByRule(app, key);
    },

    /**
     * 필터 값에 해당하는 배지(색상/문구) 반환
     * 설정에 없으면 값 자체를 문구로 사용
     */
    getBadge: function(key, value) {
      var badge = ((config.badges || {})[key] || {})[value];
      if (badge) return badge;
      return { label: value || '', class: '' };
    },

    /**
     * 앱의 필터 값을 배지로 반환
     */
    getBadgeForApp: function(app, key) {
      return this.getBadge(key, extractByRule(app, key));
    },

    /**
     * 앱 이름에서 고객명 추출
     */
    extractCustomer: function(app) {
      return extractByRule(app, 'customer');
    },

    /**
     * 앱 ID에서 타입 추출
     */
    extractAppType: function(app) {
      return extractByRule(app, 'appType');
    },

    /**
     * 앱 이름에서 환경 추출
     */
    extractEnvironment: function(app) {
      return extractByRule(app, 'environment');
    },

    /**
     * 플랫폼 추출
     */
    extractPlatforms: function(app) {
      var platforms = [];
      if (app.downloads) {
        app.downloads.forEach(function(d) {
          if (d.isUse && d.platform) {
            var p = d.platform.toUpperCase();
            if (platforms.indexOf(p) === -1) platforms.push(p);
          }
        });
      }
      return platforms;
    },

    /**
     * 모든 필터 옵션 추출
     */
    getFilterOptions: function(apps) {
      var self = this;
      var options = {};

      filters().forEach(function(filter) {
        options[filter.key] = [];
      });

      apps.forEach(function(app) {
        filters().forEach(function(filter) {
          var list = options[filter.key];

          if (filter.type === 'platform') {
            self.extractPlatforms(app).forEach(function(p) {
              if (list.indexOf(p) === -1) list.push(p);
            });
            return;
          }

          var value = extractByRule(app, filter.key);
          if (value && list.indexOf(value) === -1) list.push(value);
        });
      });

      return options;
    },

    /**
     * 필터 UI 생성 (Tailwind 버전)
     */
    createFilterUI: function(containerId, options) {
      var container = document.getElementById(containerId);
      if (!container) return;

      var html = '';

      // 검색창 + 필터 (데스크탑)
      html += '<div class="flex flex-col lg:flex-row gap-4">';

      // 검색창
      html += '<div class="flex-1">';
      html += '<div class="relative">';
      html += '<input type="text" id="filter-search" placeholder="' + text('searchPlaceholder', '') + '" ';
      html += 'class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition">';
      html += '<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">';
      html += '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>';
      html += '</svg>';
      html += '</div>';
      html += '</div>';

      // 필터 드롭다운들 (데스크탑)
      html += '<div class="hidden lg:flex gap-3 desktop-filters">';

      filters().forEach(function(filter) {
        var opts = options[filter.key] || [];

        html += '<select id="filter-' + filter.key + '" ';
        html += 'class="px-4 py-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition cursor-pointer min-w-[140px]">';
        html += '<option value="">' + filter.label + '</option>';
        opts.forEach(function(opt) {
          html += '<option value="' + opt + '">' + opt + '</option>';
        });
        html += '</select>';
      });

      html += '</div>';

      // 필터 버튼 (모바일)
      html += '<div class="lg:hidden">';
      html += '<button id="filter-toggle-btn" class="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition">';
      html += '<span class="text-slate-600">' + text('filterButtonLabel', '') + '</span>';
      html += '<span class="flex items-center gap-2">';
      html += '<span id="filter-count" class="bg-primary-500 text-white text-xs px-2 py-1 rounded-full hidden">0</span>';
      html += '<svg class="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">';
      html += '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"></path>';
      html += '</svg>';
      html += '</span>';
      html += '</button>';
      html += '</div>';

      html += '</div>';

      // 모바일 필터 서랍
      html += '<div id="filter-drawer" class="fixed inset-0 bg-black/50 z-50 hidden">';
      html += '<div class="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[80vh] overflow-hidden filter-drawer-content translate-y-full transition-transform duration-300">';

      // 서랍 헤더
      html += '<div class="sticky top-0 bg-white border-b border-slate-200 px-4 py-4 flex justify-between items-center">';
      html += '<h3 class="text-lg font-semibold text-slate-800">' + text('drawerTitle', '') + '</h3>';
      html += '<button id="filter-drawer-close" class="p-2 hover:bg-slate-100 rounded-full transition">';
      html += '<svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">';
      html += '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      html += '</svg>';
      html += '</button>';
      html += '</div>';

      // 서랍 내용
      html += '<div class="p-4 space-y-4 overflow-y-auto">';

      filters().forEach(function(filter) {
        var opts = options[filter.key] || [];

        html += '<div>';
        html += '<label class="block text-sm font-medium text-slate-700 mb-2">' + filter.label + '</label>';
        html += '<select id="filter-' + filter.key + '-mobile" ';
        html += 'class="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none">';
        html += '<option value="">' + text('allOptionLabel', '') + '</option>';
        opts.forEach(function(opt) {
          html += '<option value="' + opt + '">' + opt + '</option>';
        });
        html += '</select>';
        html += '</div>';
      });

      html += '</div>';

      // 서랍 액션
      html += '<div class="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex gap-3">';
      html += '<button id="filter-reset" class="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition font-medium">' + text('resetButtonLabel', '') + '</button>';
      html += '<button id="filter-apply" class="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">' + text('applyButtonLabel', '') + '</button>';
      html += '</div>';

      html += '</div>';
      html += '</div>';

      container.innerHTML = html;

      // 이벤트 설정
      this.setupFilterEvents();
    },

    /**
     * 필터 이벤트 설정
     */
    setupFilterEvents: function() {
      var self = this;
      var searchInput = document.getElementById('filter-search');
      var toggleBtn = document.getElementById('filter-toggle-btn');
      var drawer = document.getElementById('filter-drawer');
      var drawerContent = drawer ? drawer.querySelector('.filter-drawer-content') : null;
      var closeBtn = document.getElementById('filter-drawer-close');
      var applyBtn = document.getElementById('filter-apply');
      var resetBtn = document.getElementById('filter-reset');
      var searchTimeout = null;
      var debounceMs = text('searchDebounceMs', 300);

      // 검색 이벤트 (디바운스)
      if (searchInput) {
        searchInput.addEventListener('input', function() {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(function() {
            self.emitFilterChange();
          }, debounceMs);
        });
      }

      // 데스크탑 필터 이벤트
      filters().forEach(function(filter) {
        var select = document.getElementById('filter-' + filter.key);
        if (select) {
          select.addEventListener('change', function() {
            self.syncToMobile(filter.key);
            self.emitFilterChange();
          });
        }
      });

      // 모바일 서랍 열기
      if (toggleBtn && drawer && drawerContent) {
        toggleBtn.addEventListener('click', function() {
          drawer.classList.remove('hidden');
          document.body.style.overflow = 'hidden';
          setTimeout(function() {
            drawerContent.classList.remove('translate-y-full');
          }, 10);
        });
      }

      // 서랍 닫기 함수
      function closeDrawer() {
        if (drawer && drawerContent) {
          drawerContent.classList.add('translate-y-full');
          setTimeout(function() {
            drawer.classList.add('hidden');
            document.body.style.overflow = '';
          }, 300);
        }
      }

      // X 버튼으로 닫기
      if (closeBtn) {
        closeBtn.addEventListener('click', closeDrawer);
      }

      // 배경 클릭으로 닫기
      if (drawer) {
        drawer.addEventListener('click', function(e) {
          if (e.target === drawer) {
            closeDrawer();
          }
        });
      }

      // 적용 버튼
      if (applyBtn) {
        applyBtn.addEventListener('click', function() {
          self.syncToDesktop();
          self.emitFilterChange();
          closeDrawer();
        });
      }

      // 초기화 버튼
      if (resetBtn) {
        resetBtn.addEventListener('click', function() {
          self.resetFilters();
          self.emitFilterChange();
          closeDrawer();
        });
      }
    },

    /**
     * 데스크탑 → 모바일 동기화
     */
    syncToMobile: function(key) {
      var desktop = document.getElementById('filter-' + key);
      var mobile = document.getElementById('filter-' + key + '-mobile');
      if (desktop && mobile) {
        mobile.value = desktop.value;
      }
      this.updateFilterCount();
    },

    /**
     * 모바일 → 데스크탑 동기화
     */
    syncToDesktop: function() {
      filters().forEach(function(filter) {
        var desktop = document.getElementById('filter-' + filter.key);
        var mobile = document.getElementById('filter-' + filter.key + '-mobile');
        if (desktop && mobile) {
          desktop.value = mobile.value;
        }
      });
      this.updateFilterCount();
    },

    /**
     * 필터 초기화
     */
    resetFilters: function() {
      var searchInput = document.getElementById('filter-search');
      if (searchInput) searchInput.value = '';

      filters().forEach(function(filter) {
        var desktop = document.getElementById('filter-' + filter.key);
        var mobile = document.getElementById('filter-' + filter.key + '-mobile');
        if (desktop) desktop.value = '';
        if (mobile) mobile.value = '';
      });

      this.updateFilterCount();
    },

    /**
     * 활성 필터 개수 업데이트
     */
    updateFilterCount: function() {
      var count = 0;
      filters().forEach(function(filter) {
        var select = document.getElementById('filter-' + filter.key);
        if (select && select.value) count++;
      });

      var countEl = document.getElementById('filter-count');
      if (countEl) {
        if (count > 0) {
          countEl.textContent = count;
          countEl.classList.remove('hidden');
        } else {
          countEl.classList.add('hidden');
        }
      }
    },

    /**
     * 필터 변경 이벤트 발생
     */
    emitFilterChange: function() {
      var filterValues = this.getCurrentFilters();
      var event = new CustomEvent('filtersChanged', { detail: filterValues });
      window.dispatchEvent(event);
      this.updateFilterCount();
    },

    /**
     * 현재 필터 상태 반환
     */
    getCurrentFilters: function() {
      var searchInput = document.getElementById('filter-search');
      var current = {};

      filters().forEach(function(filter) {
        current[filter.key] = (document.getElementById('filter-' + filter.key) || {}).value || null;
      });

      current.search = searchInput ? searchInput.value : '';
      return current;
    },

    /**
     * 필터 값 설정
     */
    setFilters: function(filterValues) {
      var searchInput = document.getElementById('filter-search');
      if (searchInput && filterValues.search) {
        searchInput.value = filterValues.search;
      }

      filters().forEach(function(filter) {
        var value = filterValues[filter.key];
        var desktop = document.getElementById('filter-' + filter.key);
        var mobile = document.getElementById('filter-' + filter.key + '-mobile');
        if (desktop && value) desktop.value = value;
        if (mobile && value) mobile.value = value;
      });

      this.updateFilterCount();
    },

    /**
     * 앱이 필터와 매치되는지 확인
     */
    matchesFilters: function(app, filterValues) {
      var self = this;

      // 검색어 필터
      if (filterValues.search) {
        var searchTerm = filterValues.search.toLowerCase();
        var name = (app.name || '').toLowerCase();
        var summary = (app.summary || '').toLowerCase();
        if (!name.includes(searchTerm) && !summary.includes(searchTerm)) {
          return false;
        }
      }

      // 설정된 필터들
      var matched = true;
      filters().forEach(function(filter) {
        if (!matched) return;

        var value = filterValues[filter.key];
        if (!value) return;

        if (filter.type === 'platform') {
          if (self.extractPlatforms(app).indexOf(value) === -1) matched = false;
          return;
        }

        if (extractByRule(app, filter.key) !== value) matched = false;
      });

      return matched;
    }
  };

  // 스크립트 로드 시점에 설정을 미리 가져온다.
  // 필터를 쓰는 쪽은 FilterManager.ready 를 await 한 뒤 사용할 것.
  FilterManager.ready = loadConfig();

  window.FilterManager = FilterManager;

})(window);
