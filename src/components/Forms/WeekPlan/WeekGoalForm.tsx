import { View, Text, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import WeekGoalItem from './WeekGoalItem';
import { steps } from 'react-native-reanimated';

export type handleInputChangeType = (value: string, index: number) => void;

export default function WeekGoalForm() {
  const [steps, setSteps] = useState([
    { steps: '8000', active: true },
    { steps: '9000', active: true },
    { steps: '10000', active: true },
    { steps: '8500', active: true },
    { steps: '5000', active: true },
    { steps: '5000', active: false },
    { steps: '0', active: false },
  ]);

  const handleInputChange: handleInputChangeType = (value, index) => {
    let newValue = value;
    if (Number.isNaN(Number(newValue))) return;
    if (Number(value) <= 0) newValue = '';

    setSteps(state => {
      const newState = [...state];
      newState[index].steps = newValue;
      return newState;
    });
  };

  return (
    <View style={styles.form}>
      {steps.map((steps, index) => (
        <WeekGoalItem
          day={index}
          steps={steps.steps}
          active={steps.active}
          key={index}
          onChange={handleInputChange}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
  },
});
