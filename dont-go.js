function dontGo() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var defaults = {
        title: 'Don\'t go!',
        faviconSrc: '',
        timeout: 0
    };

    var opts = Object.assign(defaults, options);
    var originalTitle = document.title;
    var favicon = void 0;
    var originalFavicon = void 0;
    var img = void 0;
    var timeout = void 0;


    if (document.querySelectorAll('link[rel$="icon"]').length) {
        favicon = document.querySelector('link[rel$="icon"]');
        originalFavicon = favicon.getAttribute('href');
    }


    if (opts.faviconSrc.length) {
        img = new Image();
        img.src = opts.faviconSrc;
    }

    var setHidden = function setHidden() {
        document.title = opts.title;
        if (opts.faviconSrc.length) {
            favicon.setAttribute('href', opts.faviconSrc);
        }
    };

    document.addEventListener('visibilitychange', function () {
        if (document.visibilityState === 'hidden') {
            if (opts.timeout > 0) {
                timeout = setTimeout(setHidden, opts.timeout);
            } else {
                setHidden();
            }
        } else {
            document.title = originalTitle;
            favicon.setAttribute('href', originalFavicon);
            clearTimeout(timeout);
        }
    });
};