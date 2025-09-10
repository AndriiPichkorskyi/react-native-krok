import { StyleSheet, Text, type TextProps } from 'react-native';
import { Colors } from '../../constants/Colors';

export type ThemedTextProps = TextProps & {
    type?: "default" | "h1" | "h2" | "h3",
    style?: object,
    color?: "default" | "primary"
}

export function ThemedText({ type = "default", style = {}, color = "default", ...rest }: ThemedTextProps) {
    const styleColor = color === "default" ? { color: Colors.light.text } : { color: Colors.light.primary }
    return (
        <Text
            style={{ ...styles[type], ...styleColor, ...style }}
            {...rest}
        />
    )
}

const styles = StyleSheet.create({
    default: {
        fontSize: 14,
    },
    h1: {
        fontSize: 32,
        fontWeight: 900
    },
    h2: {
        fontSize: 18,
        fontWeight: 900
    },
    h3: {
        fontSize: 16,
        fontWeight: 900
    }
})