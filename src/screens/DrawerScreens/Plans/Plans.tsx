import { View, StyleSheet, Dimensions, ScrollView } from 'react-native';
import React, { useContext } from 'react';
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

  const tipOfTheDayText = [
    '+1 200 кроків до цілі — 12 хв прогулянки',
    'Пора рухатись?',
    '',
    'Молодець! Ти на правильному шляху',
  ];

  return (
    <View style={styles(colorScheme).containter}>
      <Header navigation={navigation} />
      <ThemedView>
        <ScrollView>
          <ThemedText type="h1">Коучинг & Плани</ThemedText>
          <ThemedText style={styles(colorScheme).subTitle}>
            Моя ціль на сьогодні
          </ThemedText>
          <ProgressDayChart style={styles(colorScheme).chart} />
          <ThemedButton title="Редагувати Ціль" icon="pencil-alt" />
          <View style={styles(colorScheme).planForm}>
            <ThemedText type="h2">План на тиждень</ThemedText>
            <ThemedText style={styles(colorScheme).subTitle}>
              Кожного тижня ціль зростає на +5%. Ви на правильному шляху
            </ThemedText>
            <WeekPlanForm />
          </View>
          <LinearGradient
            style={styles(colorScheme).tipWrapper}
            colors={[Colors.light.gradientTo, Colors.light.gradientFrom]}
          >
            <View style={styles(colorScheme).tipOfTheDay}>
              {tipOfTheDayText.map((text, i) => (
                <ThemedText style={styles(colorScheme).tipText} key={i}>
                  {text}
                </ThemedText>
              ))}
            </View>
          </LinearGradient>
        </ScrollView>
      </ThemedView>
    </View>
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
