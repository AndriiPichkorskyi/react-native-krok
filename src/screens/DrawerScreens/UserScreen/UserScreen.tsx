import { View, Text, StyleSheet, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import ThemedView from '../../../components/ThemedView/ThemedView';
import api, { type UserType } from '../../../api/supabase';
import { useNavigation } from '@react-navigation/core';
import ROUTES from '../../../constants/routes';
import { ThemedText } from '../../../components/ThemedText';
import { Colors } from '../../../constants/Colors';
import { ThemedButton } from '../../../components/ThemedButton';
import Loader from '../../../components/Loader';

export default function UserScreen({ route }) {
  const navigation = useNavigation();

  const [user, setUser] = useState(null as null | UserType);
  const [error, setError] = useState('');

  const goBack = () => {
    if (navigation.canGoBack()) navigation.goBack();
    else navigation.navigate(ROUTES.LEADERBOARDS);
  };

  // isLoading is true because we defenetly load user from database on screen open
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { id } = route.params;
    if (!id) setError('ID відсутній');

    const getUser = async function () {
      try {
        setIsLoading(true);
        const data = await api.getUserByID(id);
        setError('');
        setUser(data);
      } catch (error) {
        setError(String(error));
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    getUser();
  }, []);

  return (
    <ThemedView style={styles.containter}>
      <ThemedText type="h2" style={styles.title}>
        Профіль
      </ThemedText>
      {error && (
        <View>
          <ThemedText>Користувача не знайдено, Помилка: {error}</ThemedText>
          <ThemedButton
            style={styles.button}
            title={'Повернутися'}
            onPress={goBack}
          ></ThemedButton>
        </View>
      )}
      {isLoading && <Loader />}

      {user && (
        <View>
          <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
          <View style={styles.userInformation}>
            <ThemedText type="h2">
              {user.first_name} {user.last_name}
            </ThemedText>
            <ThemedText>
              <ThemedText style={styles.userKilometers}>
                {user.email}
              </ThemedText>
            </ThemedText>
          </View>
        </View>
      )}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  containter: {
    paddingVertical: 24,
    justifyContent: 'flex-start',
    gap: 16,
    height: '100%',
  },
  title: {
    textAlign: 'center',
    marginBottom: 32,
  },
  userItem: {
    flexDirection: 'row',
    gap: 16,
    padding: 8,
  },
  userAvatar: {
    alignSelf: 'center',
    width: 128,
    height: 128,
    borderRadius: 90,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    padding: 2,
  },
  userInformation: {
    gap: 8,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  userKilometers: {
    color: Colors.light.primary,
    fontSize: 18,
    fontWeight: 900,
  },
  button: {
    marginTop: 16,
  },
});
