import { useContext } from 'react';
import { ThemeContext } from '../contexts/theme';

/**
 * It returns the theme colors based on the current theme
 * @returns The theme colors for the current theme.
 */
const useColors = () => {
    const { theme, themeColors } = useContext(ThemeContext);

    return theme === 'dark' ? themeColors.darkTheme : themeColors.lightTheme;
};

export default useColors;
