// js/filter-manager.js
(function(window) {
  'use strict';

  // 필터 설정
  var FILTER_CONFIG = {
    customer: { label: 'Customer', key: 'customer' },
    appType: { label: 'App Type', key: 'appType' },
    platform: { label: 'Platform', key: 'platform' },
    environment: { label: 'Environment', key: 'environment' }
  };

  var FilterManager = {
    /**
     * 앱 이름에서 고객명 추출
     */
    extractCustomer: function(app) {
      var name = app.name || '';
      if (name.includes('Royal Commission') || name.includes('RCHSP')) return 'Royal Commission';
      if (name.includes('GBC')) return 'GBC';
      if (name.includes('CMC')) return 'CMC';
      if (name.includes('MBC')) return 'MBC';
      return 'Other';
    },

    /**
     * 앱 ID에서 타입 추출
     */
    extractAppType: function(app) {
      var id = app.id || '';
      if (id.includes('ezconsent')) return 'eConsent';
      if (id.includes('ezphr') || id.includes('patient')) return 'Patient Portal';
      return 'Other';
    },

    /**
     * 앱 이름에서 환경 추출
     */
   extractEnvironment: function(app) {
  var name = (app.name || '').toLowerCase();  // 소문자로 변환!
  var id = (app.id || '').toLowerCase();
  
  if (name.includes('development') || id.includes('_dev')) return 'Development';
  if (name.includes('staging') || id.includes('_stg')) return 'Staging';
  if (name.includes('production') || id.includes('_prod')) return 'Production';
  
  // 기본값: Production
  return 'Production';
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
      var options = {
        customer: [],
        appType: [],
        platform: [],
        environment: []
      };

      var self = this;
      apps.forEach(function(app) {
        var customer = self.extractCustomer(app);
        var appType = self.extractAppType(app);
        var environment = self.extractEnvironment(app);
        var platforms = self.extractPlatforms(app);

        if (customer && options.customer.indexOf(customer) === -1) options.customer.push(customer);
        if (appType && options.appType.indexOf(appType) === -1) options.appType.push(appType);
        if (environment && options.environment.indexOf(environment) === -1) options.environment.push(environment);
        platforms.forEach(function(p) {
          if (options.platform.indexOf(p) === -1) options.platform.push(p);
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
      html += '<input type="text" id="filter-search" placeholder="앱 검색..." ';
      html += 'class="w-full pl-10 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition">';
      html += '<svg class="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">';
      html += '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>';
      html += '</svg>';
      html += '</div>';
      html += '</div>';
      
      // 필터 드롭다운들 (데스크탑)
      html += '<div class="hidden lg:flex gap-3 desktop-filters">';
      
      Object.keys(FILTER_CONFIG).forEach(function(key) {
        var config = FILTER_CONFIG[key];
        var opts = options[key] || [];
        
        html += '<select id="filter-' + key + '" ';
        html += 'class="px-4 py-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition cursor-pointer min-w-[140px]">';
        html += '<option value="">' + config.label + '</option>';
        opts.forEach(function(opt) {
          html += '<option value="' + opt + '">' + opt + '</option>';
        });
        html += '</select>';
      });
      
      html += '</div>';
      
      // 필터 버튼 (모바일)
      html += '<div class="lg:hidden">';
      html += '<button id="filter-toggle-btn" class="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition">';
      html += '<span class="text-slate-600">필터</span>';
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
      html += '<h3 class="text-lg font-semibold text-slate-800">필터 옵션</h3>';
      html += '<button id="filter-drawer-close" class="p-2 hover:bg-slate-100 rounded-full transition">';
      html += '<svg class="w-5 h-5 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">';
      html += '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>';
      html += '</svg>';
      html += '</button>';
      html += '</div>';
      
      // 서랍 내용
      html += '<div class="p-4 space-y-4 overflow-y-auto">';
      
      Object.keys(FILTER_CONFIG).forEach(function(key) {
        var config = FILTER_CONFIG[key];
        var opts = options[key] || [];
        
        html += '<div>';
        html += '<label class="block text-sm font-medium text-slate-700 mb-2">' + config.label + '</label>';
        html += '<select id="filter-' + key + '-mobile" ';
        html += 'class="w-full px-4 py-3 border border-slate-300 rounded-lg bg-white focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none">';
        html += '<option value="">전체</option>';
        opts.forEach(function(opt) {
          html += '<option value="' + opt + '">' + opt + '</option>';
        });
        html += '</select>';
        html += '</div>';
      });
      
      html += '</div>';
      
      // 서랍 액션
      html += '<div class="sticky bottom-0 bg-white border-t border-slate-200 p-4 flex gap-3">';
      html += '<button id="filter-reset" class="flex-1 px-4 py-3 border border-slate-300 rounded-lg text-slate-600 hover:bg-slate-50 transition font-medium">초기화</button>';
      html += '<button id="filter-apply" class="flex-1 px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium">적용</button>';
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

      // 검색 이벤트 (디바운스)
      if (searchInput) {
        searchInput.addEventListener('input', function() {
          clearTimeout(searchTimeout);
          searchTimeout = setTimeout(function() {
            self.emitFilterChange();
          }, 300);
        });
      }

      // 데스크탑 필터 이벤트
      Object.keys(FILTER_CONFIG).forEach(function(key) {
        var select = document.getElementById('filter-' + key);
        if (select) {
          select.addEventListener('change', function() {
            self.syncToMobile(key);
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
      var self = this;
      Object.keys(FILTER_CONFIG).forEach(function(key) {
        var desktop = document.getElementById('filter-' + key);
        var mobile = document.getElementById('filter-' + key + '-mobile');
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

      Object.keys(FILTER_CONFIG).forEach(function(key) {
        var desktop = document.getElementById('filter-' + key);
        var mobile = document.getElementById('filter-' + key + '-mobile');
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
      Object.keys(FILTER_CONFIG).forEach(function(key) {
        var select = document.getElementById('filter-' + key);
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
      var filters = this.getCurrentFilters();
      var event = new CustomEvent('filtersChanged', { detail: filters });
      window.dispatchEvent(event);
      this.updateFilterCount();
    },

    /**
     * 현재 필터 상태 반환
     */
    getCurrentFilters: function() {
      var searchInput = document.getElementById('filter-search');
      return {
        customer: (document.getElementById('filter-customer') || {}).value || null,
        appType: (document.getElementById('filter-appType') || {}).value || null,
        platform: (document.getElementById('filter-platform') || {}).value || null,
        environment: (document.getElementById('filter-environment') || {}).value || null,
        search: searchInput ? searchInput.value : ''
      };
    },

    /**
     * 필터 값 설정
     */
    setFilters: function(filters) {
      var searchInput = document.getElementById('filter-search');
      if (searchInput && filters.search) {
        searchInput.value = filters.search;
      }

      var self = this;
      Object.keys(FILTER_CONFIG).forEach(function(key) {
        var value = filters[key];
        var desktop = document.getElementById('filter-' + key);
        var mobile = document.getElementById('filter-' + key + '-mobile');
        if (desktop && value) desktop.value = value;
        if (mobile && value) mobile.value = value;
      });

      this.updateFilterCount();
    },

    /**
     * 앱이 필터와 매치되는지 확인
     */
    matchesFilters: function(app, filters) {
      var self = this;

      // 검색어 필터
      if (filters.search) {
        var searchTerm = filters.search.toLowerCase();
        var name = (app.name || '').toLowerCase();
        var summary = (app.summary || '').toLowerCase();
        if (!name.includes(searchTerm) && !summary.includes(searchTerm)) {
          return false;
        }
      }

      // 고객 필터
      if (filters.customer) {
        if (self.extractCustomer(app) !== filters.customer) return false;
      }

      // 앱 타입 필터
      if (filters.appType) {
        if (self.extractAppType(app) !== filters.appType) return false;
      }

      // 환경 필터
      if (filters.environment) {
        if (self.extractEnvironment(app) !== filters.environment) return false;
      }

      // 플랫폼 필터
      if (filters.platform) {
        var platforms = self.extractPlatforms(app);
        if (platforms.indexOf(filters.platform) === -1) return false;
      }

      return true;
    }
  };

  window.FilterManager = FilterManager;

})(window);