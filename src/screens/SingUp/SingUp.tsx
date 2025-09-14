import {
  View,
  StyleSheet,
  type TextInputChangeEvent,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { ThemedText } from '../../components/ThemedText';
import { ThemedInput } from '../../components/ThemedInput';
import { ThemedButton } from '../../components/ThemedButton';
import SocialIcon from '../../components/SocialIcon/SocialIcon';
import ThemedView from '../../components/ThemedView/ThemedView';
import { Colors, colorScheme } from '../../constants/Colors';

import { CommonActions, useNavigation } from '@react-navigation/native';
import ROUTES from '../../constants/routes';
import {
  ThemeContext,
  themeContextType,
} from '../../context/theme/ThemeContext';

const mods = {
  registration: 'Зареєструватися',
  signin: 'Увійти',
};

export default function SingUp() {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const navigation = useNavigation();

  const [mode, setMode] = useState(mods.registration);
  const [email, setEmail] = useState('root');
  const [password, setPassword] = useState('root');

  const tabStyles = (tabName: string) =>
    tabName === mode
      ? { ...styles(colorScheme).tab, ...styles(colorScheme).tabActive }
      : styles(colorScheme).tab;

  const changeMode = () => {
    mode === mods.registration
      ? setMode(mods.signin)
      : setMode(mods.registration);
  };

  const onChangeInputEmail = (event: TextInputChangeEvent) => {
    setEmail(event);
  };

  const onChangeInputPassword = (event: TextInputChangeEvent) => {
    setPassword(event);
  };

  const handleSignUp = () => {
    if (!email || !password)
      navigation.navigate(ROUTES.ERROR_SCREEN, {
        message: 'email або password невірні',
      });

    navigation.navigate(ROUTES.DRAWER);
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: ROUTES.DRAWER }],
      }),
    );
  };

  return (
    <ThemedView style={styles(colorScheme).containter}>
      <ScrollView>
        <ThemedText type="h1" style={styles(colorScheme).title}>
          {mode}
        </ThemedText>

        <View style={styles(colorScheme).tabs}>
          <TouchableOpacity onPress={changeMode}>
            <ThemedText style={tabStyles(mods.registration)}>
              {mods.registration}
            </ThemedText>
          </TouchableOpacity>
          <TouchableOpacity onPress={changeMode}>
            <ThemedText style={tabStyles(mods.signin)}>
              {mods.signin}
            </ThemedText>
          </TouchableOpacity>
        </View>

        <View style={styles(colorScheme).inputsContainer}>
          <ThemedInput
            onChange={onChangeInputEmail}
            placeholder="Email"
            title="Ваш Email"
            value={email}
          />
          <ThemedInput
            onChange={onChangeInputPassword}
            placeholder="password"
            type="password"
            title="Пароль"
            value={password}
          />
        </View>

        <View style={styles(colorScheme).bottomContainer}>
          <ThemedButton
            style={styles(colorScheme).button}
            title={mode}
            onPress={handleSignUp}
          ></ThemedButton>
          <ThemedText>або за допомогою</ThemedText>
          {/* <ThemedText>{name + ' ' + password}</ThemedText> */}
          <View style={styles(colorScheme).socials}>
            <SocialIcon icon="facebook" />
            <SocialIcon icon="google" />
            <SocialIcon icon="apple" />
          </View>
        </View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    containter: {
      justifyContent: 'space-between',
      paddingVertical: 64,
    },
    title: {
      textAlign: 'center',
    },
    tabs: {
      flexDirection: 'row',
      marginTop: 40,
      justifyContent: 'center',
      gap: 8,
    },
    tab: {
      padding: 8,
      borderRadius: 12,
    },
    tabActive: {
      backgroundColor: theme.primary,
      color: theme.inputBG,
    },
    inputsContainer: {
      marginTop: 40,
      gap: 24,
    },
    bottomContainer: {
      marginTop: 98,
      gap: 32,
      alignItems: 'center',
    },
    button: {
      width: '100%',
    },
    socials: {
      flexDirection: 'row',
      gap: 12,
    },
  });
