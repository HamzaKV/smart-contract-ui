const getBrowser = () => {
    // Opera 8.0+
    const isOpera =
        (!!window.opera && !!window.opera.addons) ||
        !!window.opera ||
        navigator.userAgent.indexOf(' OPR/') >= 0;
    if (isOpera) return 'opera';

    // Firefox 1.0+
    const isFirefox = typeof InstallTrigger !== 'undefined';
    if (isFirefox) return 'firefox';

    // Safari 3.0+ "[object HTMLElementConstructor]"
    const isSafari =
        /constructor/i.test(window.HTMLElement + '') ||
        (function (p) {
            return p.toString() === '[object SafariRemoteNotification]';
        })(
            !window['safari'] ||
                (typeof window['safari'] !== 'undefined' &&
                    window['safari'].pushNotification)
        );
    if (isSafari) return 'safari';

    // Internet Explorer 6-11
    const isIE = /*@cc_on!@*/ false || !!document.DOCUMENT_NODE;
    if (isIE) return 'ie';

    // Edge 20+
    const isEdge = !isIE && !!window.StyleMedia;
    if (isEdge) return 'edge';

    // Chrome 1 - 79
    const isChrome =
        !!window.chrome &&
        (!!window.chrome.webstore ||
            !!window.chrome.runtime ||
            !!window.chrome.csi);
    if (isChrome) return 'chrome';

    // Edge (based on chromium) detection
    const isEdgeChromium =
        isChrome && navigator.userAgent.indexOf('Edge') !== -1;
    if (isEdgeChromium) return 'edgechromium';

    // Blink engine detection
    const isBlink = (isChrome || isOpera) && !!window.CSS;
    if (isBlink) return 'blink';

    return '';
};

export default getBrowser;
