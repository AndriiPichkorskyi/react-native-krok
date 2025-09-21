import {
  View,
  StyleSheet,
  type TextInputChangeEvent,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useContext, useMemo, useState } from 'react';
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
import { supabase } from '../../api/supabaseLib';
import { useLoading } from '../../context/loaderContext';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/userSlice';
import randomAvatar from '../../helpers/randomAvatar';

const mods = {
  registration: 'Зареєструватися',
  signin: 'Увійти',
};

export default function SingUp() {
  const { toggleLoader } = useLoading();
  const dispatch = useDispatch();
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const navigation = useNavigation();

  const [mode, setMode] = useState(mods.registration);
  const [email, setEmail] = useState('test1@example.com');
  const [password, setPassword] = useState('123456');

  const tabStyles = (tabName: string) =>
    tabName === mode
      ? { ...themedStyles.tab, ...themedStyles.tabActive }
      : themedStyles.tab;

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

  const handleSignUp = async () => {
    const { error, data } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          avatar_url: randomAvatar(email.split('@')[0]),
        },
      },
    });
    return { error, data };
  };

  const handleSignIn = async () => {
    const { error, data } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    return { error, data };
  };

  const handleAuth = async () => {
    if (!email || !password)
      navigation.navigate(ROUTES.ERROR_SCREEN, {
        message: 'email або password невірні',
      });

    try {
      toggleLoader(true);

      let response;

      if (mode === mods.registration) {
        response = await handleSignUp();
      } else {
        response = await handleSignIn();
      }

      const { error, data } = response;

      if (error) throw error;

      console.log(data);

      if (data.session) {
        console.log('User signed in automatically:', data.user);
        // return { user: data.user, session: data.session };
      }

      dispatch(setUser(data.user));

      navigation.navigate(ROUTES.DRAWER);
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: ROUTES.DRAWER }],
        }),
      );
    } catch (error) {
      navigation.navigate(ROUTES.ERROR_SCREEN, {
        message: error.message || String(error),
      });
    } finally {
      toggleLoader(false);
    }
  };

  return (
    <ThemedView style={themedStyles.containter}>
      <ScrollView>
        <ThemedText type="h1" style={themedStyles.title}>
          {mode}
        </ThemedText>

        <View style={themedStyles.tabs}>
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

        <View style={themedStyles.inputsContainer}>
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

        <View style={themedStyles.bottomContainer}>
          <ThemedButton
            style={themedStyles.button}
            title={mode}
            onPress={handleAuth}
          ></ThemedButton>
          <ThemedText>або за допомогою</ThemedText>
          {/* <ThemedText>{name + ' ' + password}</ThemedText> */}
          <View style={themedStyles.socials}>
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
