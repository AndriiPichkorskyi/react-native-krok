import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/Colors';
import { useLoading } from '../../context/loaderContext';

export default function Loader() {
  const { showLoader } = useLoading();

  if (!showLoader) return null;
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
