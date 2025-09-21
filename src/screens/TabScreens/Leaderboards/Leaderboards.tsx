import ThemedView from '../../../components/ThemedView/ThemedView';
import { ThemedText } from '../../../components/ThemedText';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api, { type ProfileType } from '../../../api/supabase';
import { Colors, colorScheme } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import ROUTES from '../../../constants/routes';
import {
  ThemeContext,
  themeContextType,
} from '../../../context/theme/ThemeContext';
import { useLoading } from '../../../context/loaderContext';

export default function Leaderboards() {
  const { toggleLoader } = useLoading();
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const navigation = useNavigation();

  const [data, setData] = useState([] as ProfileType[]);
  const [error, setError] = useState('');

  const topThree = useMemo(() => data.slice(0, 3), [data]);
  const others = useMemo(() => data.slice(3), [data]);

  useEffect(() => {
    const getUsers = async function () {
      try {
        toggleLoader(true);
        const data = await api.getLeaderBoard({ limit: 10 });
        console.log(data);
        setError('');
        setData(data);
      } catch (error) {
        setError(String(error));
        setData([]);
      } finally {
        toggleLoader(false);
      }
    };
    getUsers();
  }, []);

  const onItemClick = id => {
    navigation.navigate(ROUTES.USER_SCREEN, { id });
  };

  const renderUser = useCallback(
    ({ item, index }: { item: ProfileType; index: number }) => (
      <TouchableOpacity
        style={themedStyles.userItem}
        onPress={() => onItemClick(item.id)}
      >
        <View style={themedStyles.userNumber}>
          <ThemedText type="h3">{index + 1}</ThemedText>
        </View>

        <Image
          source={{ uri: item.avatar_url }}
          style={themedStyles.userAvatar}
        />
        <View style={themedStyles.userInformation}>
          <ThemedText numberOfLines={1} ellipsizeMode="tail" type="h2">
            {item.username}
          </ThemedText>
          <ThemedText>
            Кроків:{' '}
            <ThemedText style={themedStyles.userKilometers}>
              {item.steps}
            </ThemedText>{' '}
          </ThemedText>
        </View>
      </TouchableOpacity>
    ),
    [onItemClick],
  );

  return (
    <>
      <ThemedView style={themedStyles.containter}>
        <ThemedText type="h1" style={themedStyles.title}>
          Leaderboards
        </ThemedText>
        {error && <ThemedText>{error}</ThemedText>}
        <FlatList
          style={themedStyles.userList}
          data={others}
          renderItem={({ item, index }) =>
            renderUser({ item, index: index + 3 })
          }
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={
            <View style={themedStyles.userSection}>
              {topThree.map((user, index) => (
                <View key={user.id}>{renderUser({ item: user, index })}</View>
              ))}
            </View>
          }
        ></FlatList>
      </ThemedView>
    </>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    containter: {
      paddingVertical: 24,
      justifyContent: 'flex-start',
      gap: 16,
      flex: 1,
      paddingBottom: 0,
    },
    title: {
      textAlign: 'center',
    },
    userList: {
      gap: 16,
      flex: 1,
    },
    userSection: {
      marginBottom: 16,
      backgroundColor: theme.inputBG,
      borderRadius: 12,
      borderColor: '#56565688',
      borderWidth: 1,
    },
    userItem: {
      flexDirection: 'row',
      gap: 16,
      padding: 8,
      overflow: 'hidden',
    },
    userNumber: {
      justifyContent: 'center',
    },

    userAvatar: {
      width: 64,
      height: 64,
      borderRadius: 90,
      borderWidth: 1,
      borderColor: theme.primary,
      padding: 2,
    },
    userInformation: {
      justifyContent: 'space-around',
      alignItems: 'flex-start',
      paddingRight: 16,
      maxWidth: 256,
    },
    userKilometers: {
      color: theme.primary,
      fontSize: 18,
      fontWeight: 900,
    },
  });
