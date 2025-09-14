import Ionicons from '@react-native-vector-icons/ionicons';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '../../ThemedText';
import { Colors } from '../../../constants/Colors';

export type ChallengeItemProps = {
  icon: string;
  value: string;
};

export function ChallengeItem({ icon, value }: ChallengeItemProps) {
  return (
    <View style={styles.item}>
      <Ionicons name={icon} size={24} color={Colors.light.primary} />
      <ThemedText>{value}</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
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
