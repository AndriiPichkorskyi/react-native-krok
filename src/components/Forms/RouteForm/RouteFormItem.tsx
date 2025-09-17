import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { Colors, colorScheme } from '../../../constants/Colors';
import { type handleInputChangeType, type handleOnDelete } from './RouteForm';
import {
  ThemeContext,
  themeContextType,
} from '../../../context/theme/ThemeContext';
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useWhyDidYouUpdate } from '../../../hooks/whyDidYouUpdate';

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
  ...props
}: WeekPlanItemProps) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const swipeableRef = useRef<null | ReanimatedSwipeable>(null);

  useWhyDidYouUpdate('Route form item ' + index, {
    index,
    route,
    onChange,
    onDelete,
    onToggle,
    active,
    ...props,
  });

  const buttonProps = !active
    ? { color: colorScheme.primary }
    : { color: '#565656' };

  const placeholder = useMemo(placeholderRandom, [index]);

  const DeleteAction = useCallback(
    (prog: SharedValue<number>, drag: SharedValue<number>) => {
      const styleAnimation = useAnimatedStyle(() => {
        return {
          transform: [{ translateX: drag.value + 40 }],
        };
      });

      return (
        <Animated.View style={styleAnimation}>
          <TouchableOpacity onPress={() => onDelete(index)}>
            <FontAwesome5
              name="trash"
              iconStyle="solid"
              size={24}
              style={styles(colorScheme).icon}
              color="#565656"
            />
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [onDelete, colorScheme],
  );

  const ToggleAction = useCallback(
    (prog: SharedValue<number>, drag: SharedValue<number>) => {
      const styleAnimation = useAnimatedStyle(() => {
        return {
          transform: [{ translateX: drag.value - 45 }],
        };
      });

      return (
        <Animated.View style={styleAnimation}>
          <TouchableOpacity
            onPress={() => {
              onToggle(index);
              swipeableRef.current?.close();
            }}
          >
            <FontAwesome5
              name="check-circle"
              iconStyle="solid"
              size={24}
              style={styles(colorScheme).icon}
              {...buttonProps}
            />
          </TouchableOpacity>
        </Animated.View>
      );
    },
    [onToggle, colorScheme, buttonProps],
  );

  return (
    <ReanimatedSwipeable
      ref={swipeableRef}
      friction={2}
      enableTrackpadTwoFingerGesture
      // leftThreshold={30}
      // rightThreshold={70}
      renderLeftActions={ToggleAction}
      renderRightActions={DeleteAction}
      containerStyle={{
        // marginHorizontal: 16,
        paddingHorizontal: 16,
      }}
    >
      <View style={styles(colorScheme).item}>
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
      </View>
    </ReanimatedSwipeable>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    item: {
      flexDirection: 'row',
      marginBottom: 12,
      // gap: 12,

      height: 46,
      // marginHorizontal: 24,
      // paddingHorizontal: 12,
    },
    icon: {
      padding: 12,
      borderRadius: 6,
      backgroundColor: theme.inputBG,
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,
      // marginHorizontal: 12,
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
