import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useContext, useMemo } from 'react';
import { ThemedText } from '../../../components/ThemedText';
import ThemedView from '../../../components/ThemedView/ThemedView';
import { Header } from '../../../components/Header/Header';

import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { Colors, colorScheme } from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import ProgressDayChart from '../../../components/Charts/ProgressDayChart';
import { ThemedButton } from '../../../components/ThemedButton';
import WeekPlanForm from '../../../components/Forms/WeekPlan';
import {
  ThemeContext,
  themeContextType,
} from '../../../context/theme/ThemeContext';

export default function Plans({ navigation }) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const tipOfTheDayText = [
    '+1 200 кроків до цілі — 12 хв прогулянки',
    'Пора рухатись?',
    '',
    'Молодець! Ти на правильному шляху',
  ];

  return (
    <ThemedView>
      <ThemedText type="h1">Коучинг & Плани</ThemedText>
      <ThemedText style={themedStyles.subTitle}>
        Моя ціль на сьогодні
      </ThemedText>
      <ScrollView>
        <ProgressDayChart style={themedStyles.chart} />
        {/* <ThemedButton title="Редагувати Ціль" icon="pencil-alt" /> */}
        <View style={themedStyles.planForm}>
          <ThemedText type="h2">План на тиждень</ThemedText>
          <ThemedText style={themedStyles.subTitle}>
            Кожного тижня ціль зростає на +5%. Ви на правильному шляху
          </ThemedText>
          <WeekPlanForm />
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    containter: {
      flex: 1,
    },
    subTitle: {
      textAlign: 'center',
      marginTop: 12,
      marginBottom: 12,
    },
    chart: {
      marginTop: 12,
      marginBottom: 16,
    },
    planForm: {
      marginTop: 32,
    },
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
    weekChart: {
      marginTop: 24,
    },
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
