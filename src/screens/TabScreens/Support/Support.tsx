import { StyleSheet, View } from 'react-native';
import React from 'react';
import { ThemedText } from '../../../components/ThemedText';
import ThemedView from '../../../components/ThemedView/ThemedView';

import { Header } from '../../../components/Header/Header';

export default function Support({ navigation }) {
  return (
    <View>
      <Header navigation={navigation} />
      <ThemedView style={styles.containter}>
        <ThemedText type="h1">Support Content Here</ThemedText>
      </ThemedView>
    </View>
  );
}

const styles = StyleSheet.create({
  containter: {
    paddingVertical: 24,
    justifyContent: 'flex-start',
  },
});
