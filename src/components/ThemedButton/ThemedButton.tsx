import {
  TouchableOpacity,
  StyleSheet,
  type TouchableOpacityProps,
  type StyleProp,
  type ViewStyle,
  View,
} from 'react-native';
import { ThemedText } from '../ThemedText';
import React, { useMemo } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { colorScheme } from '../../constants/Colors';

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
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={[themedStyles.button, themedStyles[type], style]}
      {...props}
    >
      <View>
        {icon && (
          <FontAwesome5
            name={icon}
            size={16}
            style={themedStyles.icon}
            color={colorScheme.textSecondary}
            iconStyle="solid"
          />
        )}
        <ThemedText
          style={{
            ...themedStyles.text,
            color: themedStyles[type].color,
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
      color: theme.text,
      backgroundColor: theme.background,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    icon: {
      position: 'absolute',
      left: -32,
    },
    buttonView: {
      flexDirection: 'row',
      gap: 12,
    },
  });
