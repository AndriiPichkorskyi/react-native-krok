import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useContext, useMemo } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { Colors, colorScheme } from '../../../constants/Colors';
import { type handleInputChangeType, type handleOnDelete } from './RouteForm';
import {
  ThemeContext,
  themeContextType,
} from '../../../context/theme/ThemeContext';

type WeekPlanItemProps = {
  index: number;
  route: string;
  onChange: handleInputChangeType;
  onDelete: handleOnDelete;
  onToggle: handleOnDelete;
  active: boolean;
};

export default function RouteFormItem({
  index = 0,
  route,
  onChange,
  onDelete,
  onToggle,
  active,
}: WeekPlanItemProps) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;

  const Button = !active ? (
    <FontAwesome5
      name="check-circle"
      iconStyle="solid"
      size={24}
      style={styles(colorScheme).icon}
      color={colorScheme.primary}
    />
  ) : (
    <FontAwesome5
      name="check-circle"
      iconStyle="solid"
      size={24}
      style={styles(colorScheme).icon}
      color="#565656"
    />
  );

  const placeholder = useMemo(placeholderRandom, [index]);

  return (
    <View style={styles(colorScheme).item}>
      <TouchableOpacity onPress={() => onToggle(index)}>
        {Button}
      </TouchableOpacity>

      <View style={[styles(colorScheme).textContainer]}>
        <TextInput
          keyboardType="numeric"
          placeholder={placeholder}
          value={route}
          style={[
            styles(colorScheme).input,
            !active && styles(colorScheme).inputDisable,
          ]}
          placeholderTextColor={'#707070'}
          editable={active}
          onChangeText={text => onChange(text, index)}
        />
      </View>

      <TouchableOpacity onPress={() => onDelete(index)}>
        <FontAwesome5
          name="trash"
          iconStyle="solid"
          size={24}
          style={styles(colorScheme).icon}
          color="#565656"
        />
      </TouchableOpacity>
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
      color: '#!active',
    },
    weekDay: {
      marginRight: 24,
      fontSize: 18,
      color: theme.primary,
    },
    input: {
      marginRight: 4,
      padding: 0,
      color: theme.text,
    },
    inputDisable: {
      color: theme.primary,
    },
  });

const placeholderRandom = () => {
  return (
    'Visit ' +
    [
      'Kamianets-Podilskyi',
      'Carpathian Mountains',
      'Chernobyl Exclusion Zone',
      'Bakota',
      'Andriivskyi Descent',
      'Lviv National Opera',
      'Kharkiv Mirror Stream fountain',
      'Undergrounds of Lviv Private Walking Tour',
      'Lviv Coffee and Chocolate Traditions Private Walking Tour',
      'Irpin and Bucha',
    ][Number(Math.random().toString()[2])]
  );
};
