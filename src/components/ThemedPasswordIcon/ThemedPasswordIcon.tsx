import {
  type GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/Colors';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

export type ThemedPasswordIconIconProps = {
  isOn: Boolean;
  onPress: (event: GestureResponderEvent) => void;
};

export function ThemedPasswordIcon({
  isOn,
  onPress,
}: ThemedPasswordIconIconProps) {
  const iconName = isOn ? 'unlock' : 'lock';
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FontAwesome5
        name={iconName}
        size={20}
        color={Colors.light.text}
        iconStyle="solid"
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    right: 16,
    top: 36,
    // bac
  },
});
