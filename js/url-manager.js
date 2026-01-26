// js/url-manager.js
(function(window) {
  'use strict';

  var URLManager = {
    /**
     * URL 파싱 (쿼리스트링 방식)
     */
    parseURL: function() {
      var params = new URLSearchParams(window.location.search);
      
      return {
        customer: params.get('customer') || null,
        appType: params.get('appType') || null,
        platform: params.get('platform') || null,
        environment: params.get('env') || null,
        search: params.get('search') || ''
      };
    },

    /**
     * 필터를 URL로 변환
     */
    filtersToURL: function(filters) {
      var params = new URLSearchParams();
      
      if (filters.customer) params.set('customer', filters.customer);
      if (filters.appType) params.set('appType', filters.appType);
      if (filters.platform) params.set('platform', filters.platform);
      if (filters.environment) params.set('env', filters.environment);
      if (filters.search) params.set('search', filters.search);
      
      var queryString = params.toString();
      return queryString ? '?' + queryString : '';
    },

    /**
     * 브라우저 URL 업데이트
     */
    updateBrowserURL: function(filters, replace) {
      var url = window.location.pathname + this.filtersToURL(filters);
      
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
    },

    /**
     * 현재 URL 복사
     */
    copyCurrentURL: function() {
      var url = window.location.href;
      
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(url).then(function() {
          return true;
        }).catch(function() {
          return false;
        });
      }
      
      // 폴백
      var textArea = document.createElement('textarea');
      textArea.value = url;
      document.body.appendChild(textArea);
      textArea.select();
      var success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return Promise.resolve(success);
    }
  };

  window.URLManager = URLManager;

})(window);