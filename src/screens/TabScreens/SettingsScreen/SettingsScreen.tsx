import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import React, { useState, useCallback, useContext, useMemo } from 'react';
import { ThemedText } from '../../../components/ThemedText';
import ThemedView from '../../../components/ThemedView/ThemedView';
import ThemeSwitcher from '../../../components/ThemeSwitcher/ThemeSwitcher';
import { ThemedInput } from '../../../components/ThemedInput';
import { userSelector } from '../../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { ThemedButton } from '../../../components/ThemedButton';
import { supabase } from '../../../api/supabaseLib';
import { useLoading } from '../../../context/loaderContext';
import { setUser } from '../../../redux/userSlice';
import randomAvatar from '../../../helpers/randomAvatar';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import {
  ThemeContext,
  themeContextType,
} from '../../../context/theme/ThemeContext';
import { type colorScheme } from '../../../constants/Colors';

export default function SettingsScreen({}) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const { toggleLoader } = useLoading();
  const user = useSelector(userSelector);
  const dispatch = useDispatch();

  const [name, setName] = useState(user.username || '');
  const [avatar, setAvatar] = useState(user.avatar_url || '');

  const handleRandomAvatar = useCallback(() => {
    setAvatar(randomAvatar(Math.random().toString(16).substring(2, 7)));
  }, []);

  const handleReset = useCallback(() => {
    setName(user.username || '');
    setAvatar(user.avatar_url || '');
  }, []);

  const handleForm = async () => {
    const dataToSend: Partial<{ username: string; avatar_url: string }> = {};
    if (user.username !== name) dataToSend.username = name;
    if (user.avatar_url !== avatar) dataToSend.avatar_url = avatar;
    if (Object.keys(dataToSend).length === 0) return;

    try {
      toggleLoader(true);

      const { error, data } = await supabase.auth.updateUser({
        data: dataToSend,
      });

      if (error) throw error;

      console.log(data);

      dispatch(setUser(data.user));
    } catch (error) {
    } finally {
      toggleLoader(false);
    }

    // console.log(response);
  };

  return (
    <ThemedView style={themedStyles.containter}>
      <ThemedText type="h2">Профіль & Налаштування</ThemedText>
      <ThemedText style={themedStyles.subTitle}>
        Зробіть застосунок своїм: стиль, приватність, сповіщення.
      </ThemedText>
      <View style={themedStyles.profileTheme}>
        <ThemeSwitcher />
      </View>
      <View style={themedStyles.profileView}>
        <ThemedText style={themedStyles.profileTitle}>Твій профіль</ThemedText>
        <ThemedText style={themedStyles.profileSubTitle}>
          Тут твій куточок!-зробімо його персональним
        </ThemedText>
        <View style={themedStyles.profileForm}>
          <TouchableOpacity
            style={themedStyles.avatar}
            onPress={handleRandomAvatar}
          >
            {avatar ? (
              <>
                <Image
                  style={themedStyles.userImage}
                  source={{ uri: avatar }}
                />
                <FontAwesome5
                  name="pen"
                  size={16}
                  iconStyle="solid"
                  color={colorScheme.textSecondary}
                  style={themedStyles.imgIcon}
                />
              </>
            ) : (
              <ThemedText>
                No avatar, press here to generate random Avatar
              </ThemedText>
            )}
          </TouchableOpacity>
          <View style={themedStyles.profileFormInputs}>
            <ThemedInput
              value={name}
              title="Name:"
              onChange={setName}
              titleInner
            />
            <ThemedInput
              value={user.email}
              title="Email:"
              onChange={() => {}}
              titleInner
              editable={false}
            />
          </View>
        </View>
      </View>

      <View style={themedStyles.buttonView}>
        <ThemedButton
          type="secondary"
          title="Скинути"
          style={themedStyles.button}
          onPress={handleReset}
        />
        <ThemedButton
          type="primary"
          title="Зберегти"
          style={themedStyles.button}
          onPress={handleForm}
        />
      </View>
    </ThemedView>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    containter: {
      paddingVertical: 24,
      justifyContent: 'flex-start',
    },
    subTitle: {
      marginTop: 12,
      textAlign: 'center',
    },
    profileView: {
      marginTop: 48,
    },
    profileTitle: {
      fontWeight: 900,
      fontSize: 16,
    },
    profileSubTitle: { marginTop: 4 },

    profileForm: {
      marginTop: 16,
      flexDirection: 'row',
      gap: 16,
      alignItems: 'center',
    },
    avatar: {
      borderRadius: 90,
      width: 100,
      height: 100,
    },
    imgIcon: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      borderRadius: 90,
      backgroundColor: theme.primary,
      padding: 4,
    },
    userImage: {
      flex: 1,
    },
    profileFormInputs: {
      flex: 1,
      gap: 12,
    },
    profileTheme: {
      marginTop: 16,
      justifyContent: 'flex-start',
    },
    buttonView: {
      flexDirection: 'row',
      gap: 12,
      marginTop: 16,
    },
    button: {
      flex: 1,
    },
  });
