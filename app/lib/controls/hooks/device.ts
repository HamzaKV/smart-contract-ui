/* eslint-disable no-extra-boolean-cast */
/* eslint-disable no-restricted-globals */
import { useState, useEffect } from 'react';
import getBrowser from './utils/browser';

const mql = window.matchMedia('(orientation: portrait)');

type TBreakPoints = keyof typeof breakpoints;

export interface IFunc {
    breakpoint: TBreakPoints;
    windowWidth: number; //width of window => changing
    windowHeight: number; //height of window => changing
    orientation: 'portrait' | 'landscape';
    browser:
        | 'opera'
        | 'firefox'
        | 'safari'
        | 'ie'
        | 'edge'
        | 'chrome'
        | 'edgechromium'
        | 'blink'
        | '';
    screenWidth: number; //width of device => constant
    screenHeight: number; //height of device => constant
    screenAvailWidth: number; //width of device minus interface features => constant
    screenAvailHeight: number; //height of device minus interface features => constant
    screenColorDepth: number; //number of bits used to display one color
    screenPixelDepth: number; //pixel depth of the screen
    pageWidth: number; //width of window => changing
    pageHeight: number; //height of window => changing
}

/**
 * It returns an object with a bunch of device information
 * @returns An object with the properties of the client device
 */
const useDevice = (): IFunc => {
    const [device, setDevice] = useState<any>({
        breakpoint: 'lg',
        windowWidth: undefined,
        windowHeight: undefined,
        orientation: mql.matches ? 'portrait' : 'landscape',
        screenWidth: screen.width,
        screenHeight: screen.height,
        screenAvailWidth: screen.availWidth,
        screenAvailHeight: screen.availHeight,
        screenColorDepth: screen.colorDepth,
        screenPixelDepth: screen.pixelDepth,
        browser: getBrowser(),
        pageWidth: Math.max(
            document.body.scrollWidth,
            document.body.offsetWidth,
            document.documentElement.clientWidth,
            document.documentElement.scrollWidth,
            document.documentElement.offsetWidth
        ),
        pageHeight: Math.max(
            document.body.scrollHeight,
            document.body.offsetHeight,
            document.documentElement.clientHeight,
            document.documentElement.scrollHeight,
            document.documentElement.offsetHeight
        ),
    });

    const orientation = useOrientation();

    useEffect(
        () =>
            setDevice((prev: any) => ({
                ...prev,
                orientation: orientation,
            })),
        [orientation]
    );

    useEffect(() => {
        const handleResize = (): void => {
            const width =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;

            setDevice({
                ...device,
                windowWidth: width,
                windowHeight:
                    window.innerHeight ||
                    document.documentElement.clientHeight ||
                    document.body.clientHeight,
                breakpoint: calcBr(width),
            });
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return (): void => {
            window.removeEventListener('resize', handleResize);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return device;
};

const calcBr = (width: number): TBreakPoints => {
    if (width < breakpoints.xs.max) {
        return 'xs';
    } else if (width >= breakpoints.sm.min && width < breakpoints.sm.max) {
        return 'sm';
    } else if (width >= breakpoints.md.min && width < breakpoints.md.max) {
        return 'md';
    } else if (width >= breakpoints.lg.min && width < breakpoints.lg.max) {
        return 'lg';
    } else {
        return 'xl';
    }
};

export const breakpoints = {
    xs: {
        max: 600,
    },
    sm: {
        min: 600,
        max: 768,
    },
    md: {
        min: 768,
        max: 992,
    },
    lg: {
        min: 992,
        max: 1200,
    },
    xl: {
        min: 1200,
    },
};

export default useDevice;

const useOrientation = () => {
    const [orientation, setOrientation] = useState(
        mql.matches ? 'portrait' : 'landscape'
    );

    useEffect(() => {
        const handleOrientationChange =
            (type: 'mql' | 'orientationchange' | 'deviceorientation') =>
                (m: any): void => {
                    if (type === 'mql') {
                        if (m.matches) {
                            setOrientation('portrait');
                        } else {
                            setOrientation('landscape');
                        }
                    } else if (type === 'deviceorientation') {
                        const o =
                        window.orientation ||
                        (screen.orientation || {}).type.includes('landscape')
                            ? 'landscape'
                            : 'portrait';

                        setOrientation(o);
                    } else {
                        const o =
                        window.orientation ||
                        (screen.orientation || {}).type.includes('landscape')
                            ? 'landscape'
                            : 'portrait';

                        setOrientation(o);
                    }
                };

        if (!!window.onorientationchange) {
            window.addEventListener(
                'orientationchange',
                handleOrientationChange('orientationchange')
            );
        } else if (!!window.ondeviceorientation) {
            window.addEventListener(
                'deviceorientation',
                handleOrientationChange('deviceorientation')
            );
        } else {
            mql.addEventListener('change', handleOrientationChange('mql'));
        }

        if (!!window.onorientationchange) {
            window.removeEventListener(
                'orientationchange',
                handleOrientationChange('orientationchange')
            );
        } else if (!!window.ondeviceorientation) {
            window.removeEventListener(
                'deviceorientation',
                handleOrientationChange('deviceorientation')
            );
        } else {
            mql.removeEventListener('change', handleOrientationChange('mql'));
        }
    }, []);

    return orientation;
};
