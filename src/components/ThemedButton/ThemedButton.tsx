import {
  TouchableOpacity,
  StyleSheet,
  type TouchableOpacityProps,
  type StyleProp,
  type ViewStyle,
  View,
} from 'react-native';
import { ThemedText } from '../ThemedText';
import React from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { Colors, colorScheme } from '../../constants/Colors';

import { useContext } from 'react';
import {
  ThemeContext,
  themeContextType,
} from '../../context/theme/ThemeContext';

export type ThemedButton = TouchableOpacityProps & {
  title?: string;
  type?: 'primary' | 'secondary';
  style?: object;
  icon?: string;
};

export function ThemedButton({
  title = 'Button',
  type = 'primary',
  style = {},
  icon,
  ...props
}: ThemedButton) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[styles(colorScheme).button, styles(colorScheme)[type], style]}
      {...props}
    >
      <View>
        {icon && (
          <FontAwesome5
            name={icon}
            size={16}
            style={styles(colorScheme).icon}
            color={colorScheme.textSecondary}
            iconStyle="solid"
          />
        )}
        <ThemedText
          style={{
            ...styles(colorScheme).text,
            color: styles(colorScheme)[type].color,
          }}
        >
          {title}
        </ThemedText>
      </View>
    </TouchableOpacity>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    button: {
      padding: 14.5,
      borderRadius: 10,
      fontWeight: 900,
      width: 'auto',
      alignItems: 'center',
    },
    text: {
      fontWeight: 900,
    },
    primary: {
      color: theme.textSecondary,
      backgroundColor: theme.primary,
    },
    secondary: {
      color: theme.textSecondary,
      backgroundColor: '#FFF',
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    icon: {
      position: 'absolute',
      left: -32,
    },
  });
