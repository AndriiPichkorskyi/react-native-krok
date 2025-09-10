import { View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Colors } from '../../constants/Colors';

export type SocialIconProps = {
  icon?: 'google' | 'facebook' | 'apple';
  style?: StyleSheet.NamedStyles<any>;
};

// ION Icons pack:
const iconNames = {
  facebook: 'logo-facebook',
  google: 'logo-google',
  apple: 'logo-apple',
};

export default function SocialIcon({
  icon = 'google',
  style = {},
  ...props
}: SocialIconProps) {
  const iconName = iconNames[icon];
  return (
    <View style={{ ...styles.item, ...style }} {...props}>
      <Ionicons name={iconName} size={20} color={Colors.light.text} />
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: 50,
    height: 50,
    borderRadius: 90,
    borderColor: '#D8DADC',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.light.inputBG,
  },
});
