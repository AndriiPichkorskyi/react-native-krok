import { StyleSheet } from 'react-native';
import React from 'react';
import { ThemedText } from '../../../components/ThemedText';
import ThemedView from '../../../components/ThemedView/ThemedView';

export default function Statistics({}) {
  return (
    <ThemedView style={styles.containter}>
      <ThemedText type="h1">Statistic Content Here</ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containter: {
    paddingVertical: 24,
    justifyContent: 'flex-start',
  },
});
