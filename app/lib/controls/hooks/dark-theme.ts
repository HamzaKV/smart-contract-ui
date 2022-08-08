import { useEffect, useState } from 'react';
const matchDark = '(prefers-color-scheme: dark)';

/**
 * It returns a boolean that indicates whether the user prefers dark mode or not
 * @returns isDark - A boolean value.
 */
const useDarkMode = (): boolean => {
    const [isDark, setIsDark] = useState<boolean>(
        () => window.matchMedia && window.matchMedia(matchDark).matches
    );

    useEffect(() => {
        const matcher = window.matchMedia(matchDark);
        const onChange = ({ matches }: any): void => setIsDark(matches);
        matcher.addEventListener('change', onChange);
        return (): void => matcher.removeEventListener('change', onChange);
    }, [setIsDark]);

    return isDark;
};

export default useDarkMode;
