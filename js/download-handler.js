// js/download-handler.js
(function(window) {
  'use strict';

  var PLATFORM_NAMES = {
    'IOS': 'iOS',
    'ANDROID': 'Android',
    'WINDOWS': 'Windows'
  };

  var PLATFORM_ICONS = {
    'IOS': '🍎',
    'ANDROID': '🤖',
    'WINDOWS': '🪟'
  };

  var DownloadHandler = {
    detectPlatform: function() {
      var userAgent = window.navigator.userAgent;
      var isIOS = /iPhone|iPad|iPod/i.test(userAgent) || 
                  (/Macintosh/i.test(userAgent) && navigator.maxTouchPoints === 5);
      var isAndroid = /Android/i.test(userAgent);
      
      if (isIOS) return 'IOS';
      if (isAndroid) return 'ANDROID';
      return null;
    },

    isMobile: function() {
      return /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent);
    },

createDownloadSection: function(downloads) {
  var isMobile = this.isMobile();
  var currentPlatform = this.detectPlatform();

  var html = '<div class="mt-6">';

      if (isMobile && currentPlatform) {
        html += this.createMobileDownloads(downloads, currentPlatform);
      } else {
        html += this.createDesktopDownloads(downloads);
      }

      html += '</div>';
      return html;
    },

    createMobileDownloads: function(downloads, currentPlatform) {
      var html = '';
      var download = downloads.find(function(d) {
        return d.platform.toUpperCase() === currentPlatform && d.isUse;
      });

      if (download) {
        var platformName = PLATFORM_NAMES[currentPlatform] || currentPlatform;
        var icon = PLATFORM_ICONS[currentPlatform] || '📱';
        
        html += '<div class="bg-white rounded-xl shadow-sm border border-slate-200 p-6 w-full max-w-xl mx-auto">';
        html += '<div class="flex items-center gap-4 mb-4">';
        html += '<span class="text-3xl">' + icon + '</span>';
        html += '<div>';
        html += '<h4 class="font-semibold text-slate-800">' + platformName + '</h4>';
        html += '<p class="text-sm text-slate-500">Version ' + (download.version || 'N/A') + '</p>';
        html += '</div>';
        html += '</div>';
        html += '<a href="' + download.url + '" class="block w-full text-center px-6 py-3 bg-[#0393D6] text-white font-medium rounded-lg hover:bg-[#0282be] transition-colors">다운로드</a>';
        html += '</div>';
      } else {
        html += '<div class="bg-slate-50 rounded-xl border border-slate-200 p-6 text-center">';
        html += '<p class="text-slate-500">이 앱은 현재 기기에서 사용할 수 없습니다.</p>';
        html += '</div>';
      }

      return html;
    },

createDesktopDownloads: function(downloads) {
  var html = '<div class="w-full">';
  
  // 모바일: 카드 형식 / 데스크탑: 테이블 형식
  
  // ===== 모바일 버전 (카드) =====
  html += '<div class="block md:hidden space-y-3">';
  
  var platforms = ['IOS', 'ANDROID', 'WINDOWS'];
  var PLATFORM_NAMES = { 'IOS': 'iOS', 'ANDROID': 'Android', 'WINDOWS': 'Windows' };
  var PLATFORM_ICONS = { 'IOS': '🍎', 'ANDROID': '🤖', 'WINDOWS': '🪟' };
  
  platforms.forEach(function(platform) {
    var download = downloads.find(function(d) {
      return d.platform.toUpperCase() === platform && d.isUse;
    });
    
    if (download) {
      var platformName = PLATFORM_NAMES[platform] || platform;
      var icon = PLATFORM_ICONS[platform] || '📱';
      
      html += '<div class="flex items-center justify-between p-4 bg-slate-50 rounded-xl">';
      html += '<div class="flex items-center gap-3">';
      html += '<span class="text-2xl">' + icon + '</span>';
      html += '<div>';
      html += '<p class="font-semibold text-slate-800">' + platformName + '</p>';
      html += '<p class="text-xs text-slate-500">v' + (download.version || 'N/A') + '</p>';
      html += '</div>';
      html += '</div>';
      html += '<div class="flex items-center gap-2">';

      
      // 다운로드 버튼 (아이콘만)
      html += '<a href="' + download.url + '" class="p-2 bg-[#0393D6] text-white rounded-lg hover:bg-[#0282be] transition-colors" title="다운로드">';
      html += '<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">';
      html += '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>';
      html += '</svg>';
      html += '</a>';
      
      html += '</div>';
      html += '</div>';
    }
  });
  
  html += '</div>';
  
  // ===== 데스크탑 버전 (테이블) =====
  html += '<div class="hidden md:block overflow-hidden rounded-xl border border-slate-200">';
  html += '<table class="w-full">';
  html += '<thead class="bg-slate-50 border-b border-slate-200">';
  html += '<tr>';
  html += '<th class="px-6 py-4 text-left text-sm font-semibold text-slate-600">Platform</th>';
  html += '<th class="px-6 py-4 text-left text-sm font-semibold text-slate-600">Version</th>';
  html += '<th class="px-6 py-4 text-right text-sm font-semibold text-slate-600">Download</th>';
  html += '</tr>';
  html += '</thead>';
  html += '<tbody class="divide-y divide-slate-100">';
  
  platforms.forEach(function(platform) {
    var download = downloads.find(function(d) {
      return d.platform.toUpperCase() === platform && d.isUse;
    });

    var platformName = PLATFORM_NAMES[platform] || platform;
    var icon = PLATFORM_ICONS[platform] || '📱';
    
    html += '<tr class="hover:bg-slate-50 transition-colors">';
    
    // 플랫폼
    html += '<td class="px-6 py-4">';
    html += '<div class="flex items-center gap-3">';
    html += '<span class="text-2xl">' + icon + '</span>';
    html += '<span class="font-medium text-slate-700">' + platformName + '</span>';
    html += '</div>';
    html += '</td>';
    
    if (download) {
      // 버전
      html += '<td class="px-6 py-4">';
      html += '<span class="text-slate-500">v' + (download.version || 'N/A') + '</span>';
      html += '</td>';
      
      // 다운로드 버튼
      html += '<td class="px-6 py-4">';
      html += '<div class="flex items-center justify-end gap-3">';
      html += '<a href="' + download.url + '" class="inline-flex items-center px-4 py-2 bg-[#0393D6] text-white text-sm font-medium rounded-lg hover:bg-[#0282be] transition-colors">';
      html += '다운로드';
      html += '</a>';
      
      // QR 코드 버튼 (iOS, Android만)
      if (platform === 'IOS' || platform === 'ANDROID') {
        html += '<button class="qr-code-btn inline-flex items-center px-4 py-2 bg-white border border-slate-300 text-slate-600 text-sm font-medium rounded-lg hover:bg-slate-50 hover:border-slate-400 transition-colors" data-url="' + download.url + '" data-platform="' + platformName + '">';
        html += '<svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">';
        html += '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"></path>';
        html += '</svg>';
        html += 'QR';
        html += '</button>';
      }
      
      html += '</div>';
      html += '</td>';
    } else {
      // Not Available
      html += '<td class="px-6 py-4"><span class="text-slate-400">-</span></td>';
      html += '<td class="px-6 py-4 text-right">';
      html += '<span class="inline-flex items-center px-3 py-1 bg-slate-100 text-slate-400 text-sm rounded-full">N/A</span>';
      html += '</td>';
    }
    
    html += '</tr>';
  });
  
  html += '</tbody>';
  html += '</table>';
  html += '</div>';
  
  html += '</div>';

  return html;
},

 initQRCodeModal: function() {
  var self = this;

  // QR 코드 버튼 클릭
  document.addEventListener('click', function(e) {
    if (e.target.closest('.qr-code-btn')) {
      var btn = e.target.closest('.qr-code-btn');
      var url = btn.getAttribute('data-url');
      var platform = btn.getAttribute('data-platform');
      self.showQRCode(url, platform);
    }
  });

  // 모달 닫기 버튼
  var closeBtn = document.getElementById('qr-modal-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', function() {
      self.closeQRModal();
    });
  }

  // 모달 배경 클릭시 닫기
  var modal = document.getElementById('qr-modal');
  if (modal) {
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        self.closeQRModal();
      }
    });
  }

  // ESC 키로 닫기
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      self.closeQRModal();
    }
  });
},

showQRCode: function(url, platform) {
  var modal = document.getElementById('qr-modal');
  var container = document.getElementById('qr-code-container');
  var title = document.getElementById('qr-modal-title');
  
  if (!modal || !container) return;

  // 타이틀 설정
  if (title) {
    title.textContent = platform + ' 다운로드';
  }

  // 기존 QR 코드 제거
  container.innerHTML = '';

  // QR 코드 생성
  if (typeof QRCode !== 'undefined') {
    new QRCode(container, {
      text: url,
      width: 200,
      height: 200,
      colorDark: '#1e293b',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    console.error('[DownloadHandler] QRCode 라이브러리가 로드되지 않았습니다. /js/qrcode.min.js 를 확인하세요.');
    container.innerHTML =
      '<p class="text-red-500 text-sm font-medium">QR 코드를 만들 수 없습니다</p>' +
      '<p class="text-slate-500 text-xs mt-1">QR 라이브러리를 불러오지 못했습니다.</p>';
  }

  // 모달 표시
  modal.classList.remove('hidden');
  modal.classList.add('flex');
  document.body.style.overflow = 'hidden';
},

closeQRModal: function() {
  var modal = document.getElementById('qr-modal');
  if (modal) {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = '';
  }
}

    
  };

  window.DownloadHandler = DownloadHandler;

})(window);