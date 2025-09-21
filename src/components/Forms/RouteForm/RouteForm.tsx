import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useCallback, useContext, useMemo } from 'react';
import RouteFormItem from './RouteFormItem';
import { ThemedButton } from '../../ThemedButton';
import { useSelector, useDispatch } from 'react-redux';
import {
  addRoute,
  deleteRoute,
  editeRoute,
  toggleActiveRoute,
} from '../../../redux/routeSlice';
import {
  ThemeContext,
  themeContextType,
} from '../../../context/theme/ThemeContext';
import { colorScheme } from '../../../constants/Colors';
import { rotueSelector } from '../../../redux/selectors';

export type handleInputChangeType = (value: string, index: number) => void;
export type handleOnDelete = (index: number) => void;

export default function RouteForm() {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;
  const themedStyles = useMemo(() => styles(colorScheme), [colorScheme]);

  const routes = useSelector(rotueSelector);
  const dispacth = useDispatch();

  const handleInputChange: handleInputChangeType = useCallback(
    (input, index) => {
      dispacth(editeRoute({ input, index }));
    },
    [dispacth, editeRoute],
  );

  const handleAddNewRoute = useCallback(() => {
    dispacth(addRoute());
  }, [dispacth, addRoute]);

  const handleDeleteRoute: handleOnDelete = useCallback(
    index => {
      dispacth(deleteRoute({ index }));
    },
    [dispacth, deleteRoute],
  );

  const handleToggleRoute: handleOnDelete = useCallback(
    index => {
      dispacth(toggleActiveRoute({ index }));
    },
    [dispacth, toggleActiveRoute],
  );

  const renderItem = useCallback(
    ({ item, index }) => (
      <RouteFormItem
        index={index}
        route={item.route}
        active={item.active}
        key={index}
        onChange={handleInputChange}
        onDelete={handleDeleteRoute}
        onToggle={handleToggleRoute}
      />
    ),
    [handleInputChange, handleDeleteRoute, handleToggleRoute],
  );

  return (
    <View style={themedStyles.form}>
      <FlatList
        data={routes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        style={themedStyles.list}
      />
      <ThemedButton
        title="Додати новий маршрут"
        icon="pencil-alt"
        onPress={handleAddNewRoute}
        style={themedStyles.button}
      />
    </View>
  );
}

const styles = (theme: colorScheme) =>
  StyleSheet.create({
    form: {
      gap: 12,
      flex: 1,
      // paddingBottom: 64,
    },
    listBorders: {
      borderTopColor: theme.primary,
      borderBottomColor: theme.primary,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      paddingVertical: 16,
      // flex: 1,
    },
    list: {
      // flexGrow: 0,
    },
    button: {
      marginHorizontal: 16,
    },
  });
