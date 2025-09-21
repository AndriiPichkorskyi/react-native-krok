import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useMemo } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { ThemedText } from '../ThemedText';
import {
  ThemeContext,
  themeContextType,
} from '../../context/theme/ThemeContext';
import { colorScheme } from '../../constants/Colors';

export default function TipOfTheDay() {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const tipOfTheDayText = [
    '+1 200 кроків до цілі — 12 хв прогулянки',
    'Пора рухатись?',
    '',
    'Молодець! Ти на правильному шляху',
  ];

  return (
    <LinearGradient
      style={themedStyles.tipWrapper}
      colors={[colorScheme.gradientTo, colorScheme.gradientFrom]}
    >
      <View style={themedStyles.tipOfTheDay}>
        {tipOfTheDayText.map((text, i) => (
          <ThemedText style={themedStyles.tipText} key={i}>
            {text}
          </ThemedText>
        ))}
      </View>
    </LinearGradient>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    tipWrapper: {
      marginTop: 24,
      borderRadius: 8,
    },
    tipOfTheDay: {
      padding: 16,
    },
    tipText: {
      color: theme.textSecondary,
    },
  });
