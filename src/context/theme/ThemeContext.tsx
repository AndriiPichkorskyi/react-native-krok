import React, { createContext, useEffect, useState } from 'react';
import { Colors, colorScheme } from '../../constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

export type themeContextType = {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  colorScheme: colorScheme;
};

export const ThemeContext = createContext<themeContextType | null>(null);

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState<themeContextType['theme']>('dark');
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    AsyncStorage.setItem('theme', newTheme);
  };
  const colorScheme = Colors[theme];
  useEffect(() => {
    AsyncStorage.getItem('theme').then(value => setTheme(value || 'light'));
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorScheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
