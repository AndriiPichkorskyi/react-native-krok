import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../ThemedText';
import { colorScheme } from '../../../constants/Colors';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { useContext, useMemo } from 'react';
import {
  ThemeContext,
  themeContextType,
} from '../../../context/theme/ThemeContext';

export type ChallengeItemProps = {
  icon: string;
  value: string;
};

export function ChallengeItem({ icon, value }: ChallengeItemProps) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  return (
    <View style={themedStyles.item}>
      <FontAwesome5 name={icon} size={24} color={colorScheme.primary} />
      <ThemedText>{value}</ThemedText>
    </View>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    item: {
      borderWidth: 1,
      borderColor: '#56565688',
      borderRadius: 12,
      flexDirection: 'column',
      width: 100,
      padding: 12,
      alignItems: 'center',
      gap: 4,
    },
  });
