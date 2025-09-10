import { StyleSheet } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/core';
import { ThemedButton } from '../../components/ThemedButton';
import { ThemedText } from '../../components/ThemedText';
import ThemedView from '../../components/ThemedView/ThemedView';
import ROUTES from '../../constants/routes';

export default function ErrorScreen({ route }) {
  const navigation = useNavigation();
  const message = route.params.message || 'Щось пішло не так. Спробуйте ще раз';

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate(ROUTES.SIGN_UP);
  };
  return (
    <ThemedView style={styles.containter}>
      <ThemedText style={styles.text}>{message}</ThemedText>

      <ThemedButton
        style={styles.button}
        title={'Повернутися'}
        onPress={goBack}
      ></ThemedButton>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containter: {
    justifyContent: 'center',
    paddingVertical: 128,
  },
  text: {
    fontSize: 24,
    textAlign: 'center',
  },
  button: {
    marginTop: 110,
  },
});
