import React, { createContext, useState } from 'react';
import { Colors, colorScheme } from '../../constants/Colors';

export type themeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colorScheme: colorScheme;
};

export const ThemeContext = createContext<themeContextType | null>(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<themeContextType['theme']>('dark');
  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');
  const colorScheme = Colors[theme];

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
