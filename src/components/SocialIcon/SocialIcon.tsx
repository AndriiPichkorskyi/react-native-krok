import { View } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Ionicons from '@react-native-vector-icons/ionicons';
import { Colors } from '../../constants/Colors';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';

export type SocialIconProps = {
  icon?: 'google' | 'facebook' | 'apple';
  style?: StyleSheet.NamedStyles<any>;
};

// ION Icons pack:
const iconNames = {
  facebook: 'facebook-f',
  google: 'google',
  apple: 'apple',
};

export default function SocialIcon({
  icon = 'google',
  style = {},
  ...props
}: SocialIconProps) {
  const iconName = iconNames[icon];
  return (
    <View style={{ ...styles.item, ...style }} {...props}>
      <FontAwesome5
        name={iconName}
        size={20}
        color={Colors.light.text}
        iconStyle="brand"
      />
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
