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
    <View>
      <Header navigation={navigation} />
      <ThemedView style={styles.containter}>
        <View style={styles.chartContainer}>
          <ProgressChartComponent
            progress={0.62}
            style={styles.chartComponent}
          />
          <View style={styles.chartText}>
            <ThemedText type="h2" style={styles.chartTextValue}>
              6,162
            </ThemedText>
            <ThemedText>з 10 000 кроків</ThemedText>
            <ThemedText>62% завершено</ThemedText>
          </View>
        </View>
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
            {tipOfTheDayText.map(text => (
              <ThemedText style={styles.tipText}>{text}</ThemedText>
            ))}
          </View>
        </LinearGradient>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    paddingVertical: 24,
    justifyContent: 'flex-start',
  },
  chartContainer: {
    height: 200,
    width: '100%',
  },
  chartComponent: {
    position: 'absolute',
    alignSelf: 'center',
  },
  chartTextValue: {
    fontSize: 32,
  },
  chartText: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 4,
    flex: 1,
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
