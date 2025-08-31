
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { useEffect, useState } from "react";
import { ThemedText } from "../ThemedText";
import { ThemedPasswordIcon } from "../ThemedPasswordIcon";

export type ThemedInputProps = TextInputProps & {
    title?: string,
    type?: "text" | "password",
    placeholder?: string,
    onChange: CallableFunction
}

export function ThemedInput({ title = "Input Name", type = "text", placeholder = "Fill in", onChange }: ThemedInputProps) {
    const [showPassword, setSetshowPassword] = useState(false)
    const handlePasswordClick = () => setSetshowPassword(!showPassword)

    const [value, setValue] = useState("");
    useEffect(() => {
        onChange(value)
    }, [value])


    return (
        <View>
            <ThemedText>{title}</ThemedText>
            <TextInput
                underlineColorAndroid="transparent"
                placeholderTextColor="#808080"
                placeholder={placeholder}
                style={styles.input}
                secureTextEntry={type === "password" && !showPassword}
                onChangeText={setValue}
                value={value}
            />
            {type === "password" && <ThemedPasswordIcon isOn={showPassword} onPress={handlePasswordClick} />}
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        position: "relative",
        marginTop: 6,
        borderRadius: 10,
        borderColor: "#D8DADC",
        borderWidth: 1,
        paddingHorizontal: 18,
        paddingVertical: 16,

    }
})