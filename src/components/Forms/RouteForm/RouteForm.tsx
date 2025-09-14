import { View, Text, StyleSheet } from 'react-native';
import React, { useContext, useState } from 'react';
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

export default function RouteForm() {
  const { colorScheme } = useContext(ThemeContext) as themeContextType;

  const routes = useSelector(state => state.routes);
  const dispacth = useDispatch();

  console.log(routes);

  const handleInputChange: handleInputChangeType = (input, index) => {
    dispacth(editeRoute({ input, index }));
  };

  const handleAddNewRoute = () => {
    dispacth(addRoute());
  };

  const handleDeleteRoute: handleOnDelete = index => {
    dispacth(deleteRoute({ index }));
  };

  const handleToggleRoute: handleOnDelete = index => {
    dispacth(toggleActiveRoute({ index }));
  };

  return (
    <View style={styles.form}>
      {routes.map((data, index) => (
        <RouteFormItem
          index={index}
          route={data.route}
          active={data.active}
          key={index}
          onChange={handleInputChange}
          onDelete={handleDeleteRoute}
          onToggle={handleToggleRoute}
        />
      ))}

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
