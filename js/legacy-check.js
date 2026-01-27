// iOS 14.5 미만 또는 backdrop-filter 미지원 브라우저 체크
(function() {
    var isLegacy = false;
    
    // backdrop-filter 지원 여부 체크
    if (!CSS.supports || !CSS.supports('backdrop-filter', 'blur(1px)')) {
        isLegacy = true;
    }
    
    // iOS 14.5 미만 체크
    var iosMatch = navigator.userAgent.match(/OS (\d+)_(\d+)/);
    if (iosMatch) {
        var major = parseInt(iosMatch[1]);
        var minor = parseInt(iosMatch[2]);
        var version = major + (minor / 10);
        if (version < 14.5) {
            isLegacy = true;
        }
    }
    
    // 안드로이드 Chrome 84 미만 체크
    var chromeMatch = navigator.userAgent.match(/Chrome\/(\d+)/);
    if (chromeMatch && parseInt(chromeMatch[1]) < 84) {
        isLegacy = true;
    }
    
    if (isLegacy) {
        document.documentElement.classList.add('legacy-browser');
    }
})();