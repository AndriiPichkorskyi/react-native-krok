
import Ionicons from '@react-native-vector-icons/ionicons';
import { type GestureResponderEvent, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors } from '../../constants/Colors';

export type ThemedPasswordIconIconProps = {
    isOn: Boolean,
    onPress: (event: GestureResponderEvent) => void
}

export function ThemedPasswordIcon({ isOn, onPress }: ThemedPasswordIconIconProps) {
    const iconName = isOn ? "eye-off" : "eye"
    return (
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Ionicons name="lock-closed" size={20} color={Colors.light.text} />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        position: "absolute",
        right: 16,
        top: 36
        // bac
    }
})