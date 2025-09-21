import {
  type GestureResponderEvent,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import {
  ThemeContext,
  themeContextType,
} from '../../context/theme/ThemeContext';
import { useContext } from 'react';

export type ThemedPasswordIconIconProps = {
  isOn: Boolean;
  onPress: (event: GestureResponderEvent) => void;
};

export function ThemedPasswordIcon({
  isOn,
  onPress,
}: ThemedPasswordIconIconProps) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const iconName = isOn ? 'unlock' : 'lock';
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <FontAwesome5
        name={iconName}
        size={20}
        color={colorScheme.primary}
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
  },
});
