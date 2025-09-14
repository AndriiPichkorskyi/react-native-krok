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
import api, { type UserType } from '../../../api/supabase';
import { Colors, colorScheme } from '../../../constants/Colors';
import { useNavigation } from '@react-navigation/core';
import ROUTES from '../../../constants/routes';
import Loader from '../../../components/Loader';
import { Header } from '../../../components/Header/Header';
import {
  ThemeContext,
  themeContextType,
} from '../../../context/theme/ThemeContext';

export default function Leaderboards({ navigation: drawerNavigation }) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const navigation = useNavigation();

  const [data, setData] = useState([] as UserType[]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const topThree = useMemo(() => data.slice(0, 3), [data]);
  const others = useMemo(() => data.slice(3), [data]);

  useEffect(() => {
    const getUsers = async function () {
      try {
        setIsLoading(true);
        const data = await api.getLeaderBoard({ limit: 10 });
        setError('');
        setData(data);
      } catch (error) {
        setError(String(error));
        setData([]);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);

  const onItemClick = id => {
    navigation.navigate(ROUTES.USER_SCREEN, { id });
  };

  const renderUser = useCallback(
    ({ item, index }: { item: UserType; index: number }) => (
      <TouchableOpacity
        style={styles(colorScheme).userItem}
        onPress={() => onItemClick(item.id)}
      >
        <View style={styles(colorScheme).userNumber}>
          <ThemedText type="h3">{index + 1}</ThemedText>
        </View>

        <Image
          source={{ uri: item.avatar }}
          style={styles(colorScheme).userAvatar}
        />
        <View style={styles(colorScheme).userInformation}>
          <ThemedText type="h2">
            {item.first_name} {item.last_name}
          </ThemedText>
          <ThemedText>
            Distance:{' '}
            <ThemedText style={styles(colorScheme).userKilometers}>
              {item.kilometers}
            </ThemedText>{' '}
            km
          </ThemedText>
        </View>
      </TouchableOpacity>
    ),
    [onItemClick],
  );

  return (
    <>
      <Header navigation={drawerNavigation} />
      <ThemedView style={styles(colorScheme).containter}>
        <ThemedText type="h1" style={styles(colorScheme).title}>
          Leaderboards
        </ThemedText>
        {error && <ThemedText>{error}</ThemedText>}
        {isLoading && <ThemedText>Loading...</ThemedText>}
        {isLoading && <Loader />}
        <FlatList
          style={styles(colorScheme).userList}
          data={others}
          renderItem={({ item, index }) =>
            renderUser({ item, index: index + 3 })
          }
          keyExtractor={item => String(item.id)}
          ListHeaderComponent={
            <View style={styles(colorScheme).userSection}>
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
    },
    userKilometers: {
      color: theme.primary,
      fontSize: 18,
      fontWeight: 900,
    },
  });
