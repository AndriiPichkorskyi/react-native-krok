import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { useMemo, useState } from 'react';
import { ThemedText } from '../ThemedText';
import { ThemedPasswordIcon } from '../ThemedPasswordIcon';
import { Colors } from '../../constants/Colors';

import { useContext } from 'react';
import {
  ThemeContext,
  themeContextType,
} from '../../context/theme/ThemeContext';

export type ThemedInputProps = TextInputProps & {
  title?: string;
  type?: 'text' | 'password';
  placeholder?: string;
  onChange: Function;
  value: string | number;
  titleInner?: boolean;
};

export function ThemedInput({
  title = 'Input Name',
  type = 'text',
  placeholder = 'Fill in',
  onChange,
  value,
  titleInner = false,
  editable = true,
  ...props
}: ThemedInputProps) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const [showPassword, setSetshowPassword] = useState(false);
  const handlePasswordClick = () => setSetshowPassword(!showPassword);
  console.log(titleInner);
  const titleStyle = titleInner && themedStyles.titleInner;
  const inputStile = [
    themedStyles.input,
    titleInner && themedStyles.inputInner,
    !editable && themedStyles.inputDisable,
  ];

  return (
    <View style={themedStyles.constainer}>
      <ThemedText style={titleStyle || undefined}>{title}</ThemedText>
      <TextInput
        placeholder={placeholder}
        style={inputStile}
        secureTextEntry={type === 'password' && !showPassword}
        onChangeText={onChange}
        value={value}
        editable={editable}
        {...props}
      />
      {type === 'password' && (
        <ThemedPasswordIcon isOn={showPassword} onPress={handlePasswordClick} />
      )}
    </View>
  );
}

const styles = theme =>
  StyleSheet.create({
    constainer: {
      position: 'relative',
    },
    titleInner: {
      position: 'absolute',
      pointerEvents: 'none',
      zIndex: 1,
      left: 18,
      top: 12,
    },
    input: {
      position: 'relative',
      marginTop: 6,
      borderRadius: 10,
      borderColor: theme.borderColor,
      borderWidth: 1,
      paddingHorizontal: 18,
      paddingVertical: 16,
      backgroundColor: theme.inputBG,
      color: theme.text,
      fontWeight: 700,
    },
    inputInner: {
      paddingVertical: 0,
      paddingTop: 24,
      paddingBottom: 8,
    },
    inputDisable: {
      color: theme.primary,
      borderColor: theme.primary,
    },
  });
