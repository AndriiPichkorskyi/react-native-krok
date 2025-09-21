import { TouchableOpacity, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Colors, colorScheme } from '../../constants/Colors';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { useContext, useEffect, useMemo, useState } from 'react';
import {
  ThemeContext,
  themeContextType,
} from '../../context/theme/ThemeContext';
import { useSelector } from 'react-redux';
import { supabase } from '../../api/supabaseLib';
import { userSelector } from '../../redux/selectors';
// IonIcons

export function Header({ navigation }) {
  const user = useSelector(userSelector);
  console.log(user);

  const [username, setUsername] = useState('');
  useEffect(() => {
    (async () => {
      setUsername(user.username || user.email.split('@')[0]);
    })();
  }, [user]);

  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const toggleMenu = () => navigation.toggleDrawer();

  return (
    <View style={themedStyles.header}>
      {/* Left side with image and text */}
      <View style={themedStyles.user}>
        <Image
          style={themedStyles.userImage}
          source={{ uri: user.avatar_url }}
          // source={require('../../assets/cat.jpg')}
        />
        <View style={themedStyles.userInfo}>
          <View style={themedStyles.firstLine}>
            <ThemedText>Вітаю! </ThemedText>
            <ThemedText color="primary">{username}</ThemedText>
          </View>
          <View style={themedStyles.secondLiine}>
            <ThemedText>{new Date().toLocaleDateString()}</ThemedText>
          </View>
        </View>
      </View>

      {/* Right side with notification icon */}
      <View style={themedStyles.containerNotification}>
        <FontAwesome5 name="bell" size={30} color={colorScheme.text} />
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesome5
            name="bars"
            size={30}
            color={colorScheme.primary}
            iconStyle="solid"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    header: {
      justifyContent: 'space-between',
      height: 64,
      flexDirection: 'row',
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomColor: Colors.light.primary,
      borderBottomWidth: 1,
    },
    user: {
      flexDirection: 'row',
      height: '100%',
    },
    userInfo: {
      flexDirection: 'column',
      justifyContent: 'space-between',
      paddingLeft: 4,
      height: '100%',
    },
    firstLine: {
      flexDirection: 'row',
    },
    secondLiine: {},
    userImage: {
      width: 40,
      height: 40,
      resizeMode: 'cover',
      borderRadius: 90,
    },
    containerNotification: {
      flexDirection: 'row',
      gap: 32,
      height: 40,
    },
  });
