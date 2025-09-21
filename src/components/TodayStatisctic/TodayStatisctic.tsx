import { View, StyleSheet } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { ThemedText } from '../ThemedText';
import {
  ThemeContext,
  themeContextType,
} from '../../context/theme/ThemeContext';
import { colorScheme } from '../../constants/Colors';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

export default function TodayStatisctic() {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const todaysStatistic = [
    {
      icon: 'fire-alt',
      value: '247',
      title: 'Калорії',
    },
    {
      icon: 'route',
      value: '2.8',
      title: 'км',
    },
    {
      icon: 'clock',
      value: '1h 23m',
      title: 'Час',
    },
  ];

  return (
    <View style={themedStyles.todayStatistic}>
      {todaysStatistic.map(({ icon, value, title }) => (
        <View style={themedStyles.todayStatisticItem} key={title}>
          <FontAwesome5
            name={icon}
            iconStyle="solid"
            size={24}
            color={colorScheme.primary}
          />
          <ThemedText style={themedStyles.todayStatisticValue}>
            {value}
          </ThemedText>
          <ThemedText>{title}</ThemedText>
        </View>
      ))}
    </View>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    todayStatistic: {
      marginTop: 24,
      justifyContent: 'center',
      flexDirection: 'row',
      gap: 48,
    },
    todayStatisticItem: {
      alignItems: 'center',
      gap: 4,
    },
    todayStatisticValue: {
      fontWeight: 900,
      fontSize: 18,
    },
  });
