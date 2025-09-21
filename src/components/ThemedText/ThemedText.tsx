import { StyleSheet, Text, type TextProps } from 'react-native';
import { useContext, useMemo } from 'react';
import {
  ThemeContext,
  themeContextType,
} from '../../context/theme/ThemeContext';
import { colorScheme } from '../../constants/Colors';

export type ThemedTextProps = TextProps & {
  type?: 'default' | 'h1' | 'h2' | 'h3';
  style?: object;
  color?: 'default' | 'primary';
};

export function ThemedText({
  type = 'default',
  style = {},
  color = 'default',
  ...rest
}: ThemedTextProps) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const styleColor =
    color === 'default'
      ? { color: colorScheme.text }
      : { color: colorScheme.primary };
  return (
    <Text
      style={{ ...themedStyles[type], ...styleColor, ...style }}
      {...rest}
    />
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    default: {
      fontSize: 14,
    },
    h1: {
      fontSize: 32,
      fontWeight: 900,
      textAlign: 'center',
    },
    h2: {
      fontSize: 18,
      fontWeight: 900,
      textAlign: 'center',
    },
    h3: {
      fontSize: 16,
      fontWeight: 900,
    },
  });
