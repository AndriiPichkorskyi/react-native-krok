import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useMemo } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { ThemedText } from '../../ThemedText';
import { colorScheme } from '../../../constants/Colors';
import { type handleInputChangeType } from './WeekGoalForm';
import {
  ThemeContext,
  themeContextType,
} from '../../../context/theme/ThemeContext';

const DAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Нд'];

type WeekPlanItemProps = {
  day: number;
  steps: string;
  onChange: handleInputChangeType;
  active: boolean;
  handleToggleGoal: Function;
};

export default function WeekGoalItem({
  day = 0,
  steps,
  onChange,
  active,
  handleToggleGoal,
}: WeekPlanItemProps) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const buttonProps = active
    ? { color: colorScheme.primary }
    : { color: colorScheme.inactive };

  return (
    <View style={themedStyles.item}>
      <TouchableOpacity onPress={() => handleToggleGoal(day)}>
        <FontAwesome5
          name="check-circle"
          iconStyle="solid"
          size={24}
          style={themedStyles.icon}
          {...buttonProps}
        />
      </TouchableOpacity>

      <View style={[themedStyles.textContainer]}>
        <ThemedText
          style={{
            ...themedStyles.weekDay,
            ...(!active ? themedStyles.disabledItem : {}),
          }}
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
              style={themedStyles.input}
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

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    item: {
      flexDirection: 'row',
      gap: 12,

      height: 46,
    },
    icon: {
      padding: 12,
      borderRadius: 6,
      backgroundColor: theme.inputBG,
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,
    },
    textContainer: {
      flexDirection: 'row',
      padding: 12,
      borderRadius: 12,
      backgroundColor: theme.inputBG,
      flex: 1,
      alignItems: 'center',
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,
    },
    disabledItem: {
      color: theme.inactive,
    },
    weekDay: {
      marginRight: 24,
      fontSize: 18,
      color: theme.primary,
    },
    input: {
      color: theme.text,
      marginRight: 4,
      padding: 0,
    },
  });
