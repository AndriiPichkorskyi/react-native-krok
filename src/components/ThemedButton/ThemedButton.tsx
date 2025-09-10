import {
  TouchableOpacity,
  StyleSheet,
  type TouchableOpacityProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { ThemedText } from '../ThemedText';

export type ThemedButton = TouchableOpacityProps & {
  title?: string;
  type?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
};

export function ThemedButton({
  title = 'Button',
  type = 'primary',
  style = {},
  ...props
}: ThemedButton) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      style={{ ...styles.button, ...styles[type], ...style }}
      {...props}
    >
      <ThemedText style={{ ...styles.text, color: styles[type].color }}>
        {title}
      </ThemedText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 14.5,
    borderRadius: 10,
    fontWeight: 900,
    width: 'auto',
    alignItems: 'center',
  },
  text: {
    fontWeight: 900,
  },
  primary: {
    color: '#FFF',
    backgroundColor: '#14CBC5',
  },
  secondary: {
    color: '#363636',
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#56565688',
  },
});
