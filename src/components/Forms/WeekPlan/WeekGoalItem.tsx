import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { ThemedText } from '../../ThemedText';
import { Colors } from '../../../constants/Colors';
import { type handleInputChangeType } from './WeekGoalForm';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

type WeekPlanItemProps = {
  day: number;
  steps: string;
  onChange: handleInputChangeType;
  active: boolean;
};

export default function WeekGoalItem({
  day = 0,
  steps,
  onChange,
  active,
}: WeekPlanItemProps) {
  const Button = active ? (
    <FontAwesome5
      name="check-circle"
      iconStyle="solid"
      size={24}
      style={styles.icon}
      color={Colors.light.primary}
    />
  ) : (
    <FontAwesome5
      name="check-circle"
      iconStyle="solid"
      size={24}
      style={styles.icon}
      color="#565656"
    />
  );

  return (
    <View style={styles.item}>
      <TouchableOpacity>{Button}</TouchableOpacity>

      <View style={[styles.textContainer]}>
        <ThemedText
          style={{ ...styles.weekDay, ...(!active ? styles.disabledItem : {}) }}
          type="h3"
        >
          {DAYS[day]}
        </ThemedText>
        {active ? (
          <>
            <TextInput
              keyboardType="numeric"
              placeholder="0"
              value={steps}
              style={styles.input}
              onChangeText={text => onChange(text, day)}
            />
            <ThemedText>кроків</ThemedText>
          </>
        ) : (
          <ThemedText>Відпочінок</ThemedText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    gap: 12,

    height: 46,
  },
  icon: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: Colors.light.inputBG,
    borderWidth: Colors.light.borderWidth,
    borderColor: Colors.light.borderColor,
  },
  textContainer: {
    flexDirection: 'row',
    padding: 12,
    borderRadius: 12,
    backgroundColor: Colors.light.inputBG,
    flex: 1,
    alignItems: 'center',
    borderWidth: Colors.light.borderWidth,
    borderColor: Colors.light.borderColor,
  },
  disabledItem: {
    color: '#!active',
  },
  weekDay: {
    marginRight: 24,
    fontSize: 18,
    color: Colors.light.primary,
  },
  input: {
    marginRight: 4,
    padding: 0,
  },
});
