import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';

export default function Loader() {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.light.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    inset: 0,
    backgroundColor: '#000000cc',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
});
