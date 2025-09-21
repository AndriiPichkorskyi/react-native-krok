import React, { useContext, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
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
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  return (
    <SafeAreaView style={themedStyles.appContainer}>
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
