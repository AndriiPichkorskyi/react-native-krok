import { View, StyleSheet, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ThemedText } from '../../../components/ThemedText';
import ThemedView from '../../../components/ThemedView';
import { Header } from '../../../components/Header/Header';

import {
  ProgressChartComponent,
  LineChartComponent,
} from '../../../components/Charts';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { Colors } from '../../../constants/Colors';
import LinearGradient from 'react-native-linear-gradient';
import ProgressDayChart from '../../../components/Charts/ProgressDayChart';
import Animated, {
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import { useSelector } from 'react-redux';
import { stepsSelector } from '../../../redux/selectors';
import TipOfTheDay from '../../../components/TipOfTheDay';
import TodayStatisctic from '../../../components/TodayStatisctic';

export default function Home() {
  const width = Dimensions.get('window').width - 32;

  const animation = useSharedValue(200);
  useEffect(() => {
    animation.value = withDelay(500, withSpring(0));
  }, []);

  return (
    <ThemedView>
      <ProgressDayChart />
      <TodayStatisctic />
      <LineChartComponent width={width} style={styles.weekChart} />
      <Animated.View
        style={{
          transform: [{ translateY: animation }],
        }}
      >
        <TipOfTheDay />
      </Animated.View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containter: {
    height: '100%',
  },
  weekChart: {
    marginTop: 24,
  },
});
