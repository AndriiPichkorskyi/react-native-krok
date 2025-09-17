import { View, StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import React from 'react';
import { ThemedText } from '../../../components/ThemedText';
import ThemedView from '../../../components/ThemedView/ThemedView';
import { Header } from '../../../components/Header/Header';

import { Colors } from '../../../constants/Colors';
import { ThemedButton } from '../../../components/ThemedButton';
import RouteForm from '../../../components/Forms/RouteForm';

export default function Plans({ navigation }) {
  return (
    <View style={styles.containter}>
      <Header navigation={navigation} />
      <ThemedView style={{ paddingHorizontal: 0 }}>
        {/* <ScrollView> */}
        <ThemedText type="h1">Список маршрутів</ThemedText>
        <ThemedText style={styles.subTitle}>Мої цілі</ThemedText>

        <View style={styles.planForm}>
          <RouteForm />
        </View>
        {/* </ScrollView> */}
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    // flex: 1,
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
  circle: {
    height: 120,
    width: 120,
    borderRadius: 500,
  },
});
