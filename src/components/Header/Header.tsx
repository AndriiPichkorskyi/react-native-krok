import { TouchableOpacity, View } from 'react-native';
import { Image, StyleSheet } from 'react-native';
import { ThemedText } from '../ThemedText';
import { Colors } from '../../constants/Colors';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
// IonIcons

export function Header({ name = 'John', navigation }) {
  const toggleMenu = () => navigation.toggleDrawer();

  return (
    <View style={styles.header}>
      {/* Left side with image and text */}
      <View style={styles.user}>
        <Image
          style={styles.userImage}
          source={require('../../assets/cat.jpg')}
        />
        <View style={styles.userInfo}>
          <View style={styles.firstLine}>
            <ThemedText>Hello! </ThemedText>
            <ThemedText color="primary">{name}</ThemedText>
          </View>
          <View style={styles.secondLiine}>
            <ThemedText>{new Date().toLocaleDateString()}</ThemedText>
          </View>
        </View>
      </View>

      {/* Right side with notification icon */}
      <View style={styles.containerNotification}>
        <FontAwesome5 name="bell" size={30} color={Colors.light.text} />
        <TouchableOpacity onPress={toggleMenu}>
          <FontAwesome5
            name="bars"
            size={30}
            color={Colors.light.primary}
            iconStyle="solid"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    height: 64,
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    // backgroundColor: "tomato"
    borderBottomColor: Colors.light.primary,
    borderBottomWidth: 1,
  },
  user: {
    flexDirection: 'row',
    // backgroundColor: "green",
    height: '100%',
  },
  userInfo: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingLeft: 4,
    height: '100%',
    // backgroundColor: "orange"
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
