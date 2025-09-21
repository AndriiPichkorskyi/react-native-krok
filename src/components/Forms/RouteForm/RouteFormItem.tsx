import { View, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import React, { useCallback, useContext, useMemo, useRef } from 'react';
import FontAwesome5 from '@react-native-vector-icons/fontawesome5';
import { colorScheme } from '../../../constants/Colors';
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
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import { useWhyDidYouUpdate } from '../../../hooks/whyDidYouUpdate';
import { RectButton } from 'react-native-gesture-handler';

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
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const swipeableRef = useRef<null | typeof ReanimatedSwipeable>(null);

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
    : { color: colorScheme.inactive };

  const placeholder = useMemo(placeholderRandom, [index]);

  const DeleteAction = useCallback(
    (prog: SharedValue<number>, drag: SharedValue<number>) => {
      const styleAnimation = useAnimatedStyle(() => {
        return {
          transform: [{ translateX: drag.value + 70 }],
        };
      });

      return (
        <Animated.View style={styleAnimation}>
          <RectButton
            onPress={() => onDelete(index)}
            style={themedStyles.iconWrapper}
          >
            <FontAwesome5
              name="trash"
              iconStyle="solid"
              size={24}
              style={themedStyles.icon}
              color="#565656"
            />
          </RectButton>
        </Animated.View>
      );
    },
    [onDelete, colorScheme],
  );

  const ToggleAction = useCallback(
    (prog: SharedValue<number>, drag: SharedValue<number>) => {
      const styleAnimation = useAnimatedStyle(() => {
        return {
          transform: [{ translateX: drag.value - 70 }],
        };
      });

      return (
        <Animated.View style={styleAnimation}>
          <RectButton
            style={themedStyles.iconWrapperLeft}
            onPress={() => {
              onToggle(index);
              swipeableRef.current?.close();
            }}
          >
            <FontAwesome5
              name="check-circle"
              iconStyle="solid"
              size={24}
              style={themedStyles.icon}
              {...buttonProps}
            />
          </RectButton>
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
      leftThreshold={30}
      rightThreshold={30}
      renderLeftActions={ToggleAction}
      renderRightActions={DeleteAction}
      containerStyle={{
        // marginHorizontal: 16,
        // paddingHorizontal: 16,
        paddingHorizontal: 32,
      }}
    >
      <View style={themedStyles.item}>
        <View style={[themedStyles.textContainer]}>
          <TextInput
            placeholder={placeholder}
            value={route}
            style={[themedStyles.input, !active && themedStyles.inputDisable]}
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
    iconWrapper: {
      // width: 64,
      // paddingLeft: 16,
      marginRight: 16,
    },
    iconWrapperLeft: { marginLeft: 16 },
    icon: {
      padding: 12,
      borderRadius: 6,
      backgroundColor: theme.inputBG,
      borderWidth: theme.borderWidth,
      borderColor: theme.borderColor,
      width: 50,
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
