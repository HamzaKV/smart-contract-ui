import { useEffect, useState, FC } from 'react';

const breakpoints = {
    xs: {
        min: 0,
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
        max: 99999999,
    },
};

type TBreakpoints = keyof typeof breakpoints;

export interface IProps {
    type?: TBreakpoints;
    children: React.ReactNode;
    maxType?: TBreakpoints;
    minType?: TBreakpoints;
}

//check window width
//if within params then show else hide
const BreakPoint: FC<IProps> = ({
    type = 'lg',
    children,
    maxType,
    minType,
}) => {
    const [windowWidth] = useWindowSize();
    if (windowWidth && maxType && minType) {
        return windowWidth >= breakpoints[minType].min &&
            windowWidth < breakpoints[maxType].max ? (
                <>{children}</>
            ) : null;
    } else if (windowWidth && maxType) {
        return windowWidth < breakpoints[maxType].max ? <>{children}</> : null;
    } else if (windowWidth && minType) {
        return windowWidth >= breakpoints[minType].min ? <>{children}</> : null;
    } else if (windowWidth && getDeviceConfig(windowWidth) === type) {
        return <>{children}</>;
    }

    return null;
};

export default BreakPoint;

const getDeviceConfig = (width: number): TBreakpoints => {
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

interface IWindowSize {
    width: number | undefined;
    height: number | undefined;
}

const useWindowSize = (): [number | undefined, number | undefined] => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState<IWindowSize>({
        width: undefined,
        height: undefined,
    });

    useEffect(() => {
        // Handler to call on window resize
        const handleResize = (): void => {
            // Set window width/height to state
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            });
        };

        // Add event listener
        window.addEventListener('resize', handleResize);

        // Call handler right away so state gets updated with initial window size
        handleResize();

        // Remove event listener on cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []); // Empty array ensures that effect is only run on mount

    return [windowSize.width, windowSize.height];
};
