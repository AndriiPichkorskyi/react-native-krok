import React, { useContext } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {
  ThemeContext,
  themeContextType,
} from '../../context/theme/ThemeContext';
import { colorScheme } from '../../constants/Colors';

export default function AppSafeArea({
  children,
}: {
  children: React.ReactNode;
}) {
  const { colorScheme, theme } = useContext(ThemeContext) as themeContextType;

  return (
    <SafeAreaView style={styles(colorScheme).appContainer}>
      <StatusBar
        barStyle={theme !== 'light' ? 'light-content' : 'dark-content'}
      />

      {children}
    </SafeAreaView>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    appContainer: {
      flex: 1,
      backgroundColor: theme.background,
    },
  });
