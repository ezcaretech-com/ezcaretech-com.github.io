
// js/app-integration.js
(function (window) {
  'use strict';

  // 환경 배지 (추출 규칙 + 색상 모두 /assets/filter-config.json 에 정의)
  function getEnvBadge(appName, appId) {
    return FilterManager.getBadgeForApp({ name: appName, id: appId }, 'environment');
  }

  /**
   * apps.json 주소 (요청마다 타임스탬프를 붙여 캐시를 무력화)
   * 앱 목록은 수시로 바뀌므로 항상 최신본을 받는다.
   */
  function appsJsonUrl() {
    return '/assets/apps.json?t=' + Date.now();
  }


  var urlParams = new URLSearchParams(window.location.search);
  var isDetailPage = urlParams.has('id');

  // 상세 페이지면 히어로 섹션 + 필터 숨기기
  if (isDetailPage) {
    var heroSection = document.getElementById('hero-section');
    if (heroSection) {
      heroSection.style.display = 'none';
    }

    var filterContainer = document.getElementById('filter-section');
    if (filterContainer) {
      filterContainer.style.display = 'none';
    }

    initDetailPage();
  } else {
    initListPage();
  }

  // ========================================
  // 상세 페이지
  // ========================================
  function initDetailPage() {
    var appId = urlParams.get('id');

    fetch(appsJsonUrl())
      .then(function (response) { return response.json(); })
      .then(function (result) {
        var apps = Array.isArray(result.apps) ? result.apps : [result.apps];
        var app = apps.find(function (a) { return a.id === appId; });

        if (app) {
          renderDetailPage(app);
          DownloadHandler.initQRCodeModal();
        } else {
          renderNotFound();
        }
      })
      .catch(function (err) {
        console.error('Error:', err);
        renderNotFound();
      });
  }

  function renderDetailPage(app) {
    var container = document.getElementById('app_detail');
    if (!container) return;

    var imageUrl = app.indexImageUrl || app.iconUrl || '';
    if (imageUrl.startsWith('./')) {
      imageUrl = '/' + imageUrl.substring(2);
    } else if (imageUrl && !imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
      imageUrl = '/' + imageUrl;
    }

    // 2. iconUrl
    var iconUrl = app.iconUrl || '';
    if (iconUrl.startsWith('./')) {
      iconUrl = '/' + iconUrl.substring(2);
    } else if (iconUrl && !iconUrl.startsWith('/') && !iconUrl.startsWith('http')) {
      iconUrl = '/' + iconUrl;
    }

    // 스크린샷 HTML
    var screenshotsHtml = '';
    if (app.screenshots && app.screenshots.length > 0) {
      // 스크린샷 개수에 맞춘 열 수 (1~2장이 과도하게 확대되지 않도록 최소 3열)
      // Tailwind 스캐너가 찾을 수 있도록 클래스명은 문자열 그대로 둔다
      var ssCols = app.screenshots.length >= 4 ? 'md:grid-cols-4' : 'md:grid-cols-3';

      screenshotsHtml = '<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">';
      screenshotsHtml += '<h3 class="text-lg font-semibold text-slate-800 mb-4">스크린샷</h3>';
      screenshotsHtml += '<div class="flex gap-3 overflow-x-auto pb-4 snap-x snap-mandatory md:grid ' + ssCols + ' md:gap-4 md:overflow-visible md:items-start">';
      app.screenshots.forEach(function (screenshot) {
        // 3. 스크린샷 (screenshotsHtml 안에서)
        var ssUrl = screenshot.url || '';
        if (ssUrl.startsWith('./')) {
          ssUrl = '/' + ssUrl.substring(2);
        } else if (ssUrl && !ssUrl.startsWith('/') && !ssUrl.startsWith('http')) {
          ssUrl = '/' + ssUrl;
        }
        // 고정 비율 박스 없이 원본 비율 그대로 (잘림 없음). 확대 기능이 없으므로 hover 효과도 없음
        screenshotsHtml += '<div class="flex-shrink-0 w-32 md:w-auto snap-center">';
        screenshotsHtml += '<img src="' + ssUrl + '" alt="Screenshot" class="w-full h-auto rounded-lg border border-slate-200">';
        screenshotsHtml += '</div>';
      });
      screenshotsHtml += '</div>';
      screenshotsHtml += '</div>';
    }

    // 버전 히스토리 HTML
    var historyHtml = '';
    if (app.histories && app.histories.length > 0) {
      var recentHistories = app.histories.slice(0, 3);  // 최근 3개만

      historyHtml = '<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">';
      historyHtml += '<h3 class="text-lg font-semibold text-slate-800 mb-4">업데이트 내역</h3>';
      historyHtml += '<div class="space-y-4">';

      recentHistories.forEach(function (history, index) {
        var isFirst = index === 0;
        historyHtml += '<div class="' + (isFirst ? 'bg-primary-50 border border-primary-200' : 'bg-slate-50') + ' rounded-lg p-4">';
        historyHtml += '<div class="flex items-center justify-between mb-2">';
        historyHtml += '<div class="flex items-center gap-2">';
        historyHtml += '<span class="font-semibold ' + (isFirst ? 'text-primary-700' : 'text-slate-700') + '">v' + (history.version || '') + '</span>';
        if (isFirst) {
          historyHtml += '<span class="px-2 py-0.5 bg-primary-500 text-white text-xs font-medium rounded-full">Latest</span>';
        }
        historyHtml += '</div>';
        historyHtml += '<span class="text-sm text-slate-500">' + (history.releaseDate || '') + '</span>';
        historyHtml += '</div>';
        historyHtml += '<p class="text-sm text-slate-600 leading-relaxed">' + (history.description || '') + '</p>';
        historyHtml += '</div>';
      });

      // 더 많은 히스토리가 있으면 표시
      if (app.histories.length > 3) {
        historyHtml += '<p class="text-center text-sm text-slate-400 pt-2">외 ' + (app.histories.length - 3) + '개의 업데이트 내역</p>';
      }

      historyHtml += '</div>';
      historyHtml += '</div>';
    }

    // 다운로드 섹션
    var downloadHtml = '';
    if (app.downloads) {
      downloadHtml = DownloadHandler.createDownloadSection(app.downloads);
    }

    // 전체 HTML
    container.innerHTML =
      '<div class="col-span-full">' +
      // 뒤로가기 버튼
      '<a href="/" class="inline-flex items-center gap-2 text-slate-600 hover:text-primary-600 mb-6 transition-colors">' +
      '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>' +
      '</svg>' +
      '<span>목록으로 돌아가기</span>' +
      '</a>' +

      // 앱 정보 카드
      '<div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">' +
      // 헤더 이미지
      '<div class="h-48 bg-gradient-to-br from-primary-500 to-primary-700 relative">' +
      (imageUrl ? '<img src="' + imageUrl + '" alt="" class="w-full h-full object-cover opacity-30">' : '') +
      '</div>' +

      // 앱 정보
      '<div class="p-6 -mt-16 relative">' +
      '<div class="flex items-end gap-4 mb-4">' +
      '<div class="w-24 h-24 bg-white rounded-2xl shadow-lg border-4 border-white overflow-hidden flex-shrink-0">' +
      (iconUrl ? '<img src="' + iconUrl + '" alt="' + (app.name || '') + '" class="w-full h-full object-cover">' : '<div class="w-full h-full bg-primary-100 flex items-center justify-center text-3xl">📱</div>') +
      '</div>' +
      '<div class="pb-2">' +
      '<h1 class="text-2xl font-bold text-slate-800">' + (app.name || '') + '</h1>' +
      '</div>' +
      '</div>' +
      '<p class="text-slate-600 leading-relaxed mb-6">' + (app.description || app.summary || '') + '</p>' +
      '</div>' +
      '</div>' +

      // 스크린샷
      screenshotsHtml +

      // 다운로드 섹션
      '<div class="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">' +
      '<h3 class="text-lg font-semibold text-slate-800 mb-4">다운로드</h3>' +
      downloadHtml +
      '</div>' +

      // 버전 히스토리
      historyHtml +
      '</div>';
  }

  function renderNotFound() {
    var container = document.getElementById('app_detail');
    if (!container) return;

    container.innerHTML =
      '<div class="col-span-full flex flex-col items-center justify-center py-16">' +
      '<div class="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">' +
      '<svg class="w-8 h-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
      '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>' +
      '</svg>' +
      '</div>' +
      '<h3 class="text-lg font-semibold text-slate-700 mb-2">앱을 찾을 수 없습니다</h3>' +
      '<p class="text-slate-500 mb-6">요청하신 앱이 존재하지 않습니다.</p>' +
      '<a href="/" class="px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors">목록으로 돌아가기</a>' +
      '</div>';
  }

  // ========================================
  // 목록 페이지
  // ========================================
  function initListPage() {
    var apps = [];
    var filteredApps = [];
    // 필터 키는 설정에서 오므로 여기서는 검색어만 초기화한다 (URL 파싱 결과로 대체됨)
    var currentFilters = { search: '' };

    // 필터 서랍 숨기기
    setTimeout(function () {
      var drawer = document.getElementById('filter-drawer');
      if (drawer && !drawer.classList.contains('active')) {
        drawer.classList.add('hidden');
      }
    }, 100);

    // apps.json + 필터 설정 로드
    Promise.all([
      fetch(appsJsonUrl()).then(function (response) { return response.json(); }),
      FilterManager.ready
    ])
      .then(function (loaded) {
        var result = loaded[0];
        var appList = [];
        if (result.apps === null) {
          appList = [];
        } else if (Array.isArray(result.apps)) {
          appList = result.apps;
        } else {
          appList = [result.apps];
        }

        apps = appList.filter(function (app) { return app.isUse; });

        // 필터 옵션 추출
        var options = FilterManager.getFilterOptions(apps);

        // ★ URL 필터 파싱 (options 전달해서 slug 매칭!)
        var urlFilters = URLManager.parseURL(options);
        currentFilters = urlFilters;

        // 필터 UI 생성
        FilterManager.createFilterUI('filter-container', options);
        FilterManager.setFilters(currentFilters);

        // 초기 렌더링
        applyFilters();

        // 이벤트 리스너
        window.addEventListener('filtersChanged', function (e) {
          currentFilters = e.detail;
          applyFilters();
          URLManager.updateBrowserURL(currentFilters, false);
        });

        // options 를 넘겨야 뒤로가기 시 slug 가 원래 값으로 복원된다
        URLManager.onURLChange(function (filters) {
          currentFilters = filters;
          FilterManager.resetFilters();
          FilterManager.setFilters(filters);
          applyFilters();
        }, options);
      })
      .catch(function (err) {
        console.error('Error loading apps:', err);
      });

    function applyFilters() {
      filteredApps = apps.filter(function (app) {
        return FilterManager.matchesFilters(app, currentFilters);
      });
      updateAppCount();
      renderAppList();
    }

    // 제목 옆 앱 개수 (필터 적용 시 걸러진 개수 / 전체)
    function updateAppCount() {
      var countEl = document.getElementById('app-count');
      if (!countEl) return;

      countEl.textContent = filteredApps.length === apps.length
        ? apps.length + '개'
        : filteredApps.length + ' / ' + apps.length + '개';
    }
    function renderAppList() {
      var container = document.getElementById('app_detail');
      if (!container) return;

      container.innerHTML = '';

      if (filteredApps.length === 0) {
        container.innerHTML =
          '<div class="col-span-full flex flex-col items-center justify-center py-16">' +
          '<div class="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">' +
          '<svg class="w-10 h-10 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>' +
          '</svg>' +
          '</div>' +
          '<h3 class="text-xl font-semibold text-slate-700 mb-2">검색 결과가 없습니다</h3>' +
          '<p class="text-slate-400">다른 필터 조건을 시도해보세요.</p>' +
          '</div>';
        return;
      }

      filteredApps.forEach(function (app) {
        // 이미지 경로 수정
        var imageUrl = app.indexImageUrl || app.iconUrl || '';
        if (imageUrl.startsWith('./')) {
          imageUrl = '/' + imageUrl.substring(2);  // "/" 추가!
        } else if (imageUrl && !imageUrl.startsWith('/') && !imageUrl.startsWith('http')) {
          imageUrl = '/' + imageUrl;
        }

        // var iconUrl = app.iconUrl || '';
        // if (iconUrl.startsWith('./')) {
        //   iconUrl = iconUrl.substring(2);
        // }

        // 환경 배지
        var appName = app.name || '';
        var envBadge = getEnvBadge(appName, app.id);

        // 플랫폼 배지
        var platforms = [];
        if (app.downloads) {
          app.downloads.forEach(function (d) {
            if (d.isUse && d.platform) {
              var p = d.platform.toUpperCase();
              if (platforms.indexOf(p) === -1) platforms.push(p);
            }
          });
        }

        var platformBadges = '';
        if (platforms.indexOf('IOS') !== -1) {
          platformBadges += '<span class="inline-flex items-center gap-1 px-2 py-1 bg-slate-800 text-white text-xs font-medium rounded-md"><span>🍎</span>iOS</span>';
        }
        if (platforms.indexOf('ANDROID') !== -1) {
          platformBadges += '<span class="inline-flex items-center gap-1 px-2 py-1 bg-green-600 text-white text-xs font-medium rounded-md"><span>🤖</span>Android</span>';
        }
        if (platforms.indexOf('WINDOWS') !== -1) {
          platformBadges += '<span class="inline-flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs font-medium rounded-md"><span>🪟</span>Windows</span>';
        }

        // 버전 정보
        var latestVersion = '';
        if (app.downloads && app.downloads.length > 0) {
          var activeDownload = app.downloads.find(function (d) { return d.isUse; });
          if (activeDownload && activeDownload.version) {
            latestVersion = 'v' + activeDownload.version;
          }
        }

        var item = document.createElement('div');
        item.className = 'group relative bg-white rounded-2xl shadow-sm hover:shadow-xl border border-slate-200/60 overflow-hidden transition-all duration-300';
        item.innerHTML =
          // 이미지 영역
          '<div class="relative aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-50 overflow-hidden">' +
          '<img src="' + imageUrl + '" alt="' + appName + '" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" onerror="this.style.display=\'none\'">' +
          // 그라데이션 오버레이
          '<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>' +
          // 환경 배지
          '<div class="absolute top-3 left-3">' +
          '<span class="px-2.5 py-1 text-xs font-semibold rounded-lg shadow-sm ' + envBadge.class + '">' + envBadge.label + '</span>' +
          '</div>' +
          '</div>' +

          // 콘텐츠 영역
          '<div class="p-5">' +
          // 앱 이름 + 버전
          '<div class="flex items-start justify-between gap-2 mb-2">' +
          '<h3 class="font-bold text-slate-800 leading-snug line-clamp-2 group-hover:text-[#0393D6] transition-colors">' + appName + '</h3>' +
          (latestVersion ? '<span class="flex-shrink-0 text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded-full">' + latestVersion + '</span>' : '') +
          '</div>' +

          // 설명
          '<p class="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">' + (app.summary || '') + '</p>' +

          // 플랫폼 배지들
          '<div class="flex flex-wrap gap-1.5 mb-4">' + platformBadges + '</div>' +
          // 하단 영역
          '<div class="flex items-center justify-end pt-4 border-t border-slate-100">' +
          // 상세보기 버튼
          '<a href="/index.html?id=' + (app.id || '') + '" class="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-[#0393D6] to-[#0282be] text-white text-sm font-semibold rounded-lg hover:shadow-lg hover:shadow-[#0393D6]/25 transition-all duration-300">' +
          '상세보기' +
          '<svg class="w-4 h-4 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">' +
          '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>' +
          '</svg>' +
          '</a>' +
          '</div>';
        container.appendChild(item);
      });
    }

  }

})(window);