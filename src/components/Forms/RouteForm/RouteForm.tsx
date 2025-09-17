import { View, Text, StyleSheet, FlatList } from 'react-native';
import React, { useCallback, useContext } from 'react';
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

export type handleInputChangeType = (value: string, index: number) => void;
export type handleOnDelete = (index: number) => void;

export default function RouteForm(props) {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;

  const routes = useSelector(state => state.routes);
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
    <View style={styles.form}>
      <FlatList
        data={routes}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <ThemedButton
        title="Додати новий маршрут"
        icon="pencil-alt"
        onPress={handleAddNewRoute}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  form: {
    gap: 12,
  },
});
