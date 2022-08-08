import React, { createContext } from 'react';
import useDarkMode from '../hooks/dark-theme';
import usePersistantState from '../hooks/persistant-state';

type Colors = {
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
    senary: string;
    septenary: string;
    octonary: string;
    nonary: string;
    denary: string;
};

interface IProps {
    children: React.ReactNode;
    lightColors: Colors;
    darkColors: Colors;
}

type Theme = 'dark' | 'light';

interface IContext {
    theme: Theme | null;
    setTheme: React.Dispatch<Theme>;
    themeColors: {
        darkTheme: Colors;
        lightTheme: Colors;
    };
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const ThemeContext = createContext<IContext>(null);

/**
 * We're using the `usePersistantState` hook to store the theme in local storage, and we're using the
 * `useDarkMode` hook to check if the user's system is set to dark mode. the theme and the colors are
 * being passed to the children.
 * @param {IProps} props - IProps
 */
const ThemeContextProvider = (props: IProps) => {
    const isSysDark = useDarkMode();
    const [theme, setTheme] = usePersistantState<Theme>(
        'theme',
        isSysDark ? 'dark' : 'light'
    );

    return (
        <ThemeContext.Provider
            value={{
                theme,
                setTheme,
                themeColors: {
                    darkTheme: props.darkColors,
                    lightTheme: props.lightColors,
                },
            }}
        >
            {props.children}
        </ThemeContext.Provider>
    );
};

export { ThemeContextProvider, ThemeContext };
