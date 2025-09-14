import React, { useContext } from 'react';
import { Switch, StyleSheet, View } from 'react-native';
import {
  ThemeContext,
  themeContextType,
} from '../../context/theme/ThemeContext';
import { Colors } from '../../constants/Colors';
import { ThemedText } from '../ThemedText';

const ThemeSwitcher = () => {
  const { theme, toggleTheme, colorScheme } = useContext(
    ThemeContext,
  ) as themeContextType;

  const isLight = theme === 'light';

  return (
    <View style={styles.container}>
      <ThemedText>Theme is {theme}</ThemedText>
      <Switch
        trackColor={{
          false: Colors.light.background,
          true: Colors.light.primary,
        }}
        thumbColor={isLight ? Colors.light.background : Colors.light.primary}
        // ios_backgroundColor="#3e3e3e"
        onValueChange={toggleTheme}
        value={isLight}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
});

export default ThemeSwitcher;
