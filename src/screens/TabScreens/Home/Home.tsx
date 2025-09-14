import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { ThemedText } from '../../../components/ThemedText';
import ThemedView from '../../../components/ThemedView/ThemedView';
import { Header } from '../../../components/Header/Header';

import {
  ProgressChartComponent,
  LineChartComponent,
} from '../../../components/Charts';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { Colors } from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import ProgressDayChart from '../../../components/Charts/ProgressDayChart';

export default function Home({ navigation }) {
  const width = Dimensions.get('window').width - 32;

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

  const tipOfTheDayText = [
    '+1 200 кроків до цілі — 12 хв прогулянки',
    'Пора рухатись?',
    '',
    'Молодець! Ти на правильному шляху',
  ];

  return (
    <View style={styles.containter}>
      <Header navigation={navigation} />
      <ThemedView>
        <ProgressDayChart />
        <View style={styles.todayStatistic}>
          {todaysStatistic.map(({ icon, value, title }) => (
            <View style={styles.todayStatisticItem} key={title}>
              <FontAwesome5
                name={icon}
                iconStyle="solid"
                size={24}
                color={Colors.light.primary}
              />
              <ThemedText style={styles.todayStatisticValue}>
                {value}
              </ThemedText>
              <ThemedText>{title}</ThemedText>
            </View>
          ))}
        </View>
        <LineChartComponent width={width} style={styles.weekChart} />
        <LinearGradient
          style={styles.tipWrapper}
          colors={[Colors.light.gradientTo, Colors.light.gradientFrom]}
        >
          <View style={styles.tipOfTheDay}>
            {tipOfTheDayText.map((text, i) => (
              <ThemedText style={styles.tipText} key={i}>
                {text}
              </ThemedText>
            ))}
          </View>
        </LinearGradient>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    height: '100%',
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
    color: Colors.light.textSecondary,
  },
});
