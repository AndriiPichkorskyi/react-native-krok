import { createSelector, createSlice } from '@reduxjs/toolkit';
import { randomID } from '../helpers/randomID';

const initialState = [
  { route: 'Ранкова прогулянка 3 км', active: true, id: randomID() },
  { route: 'Обідня прогулянка 3 км', active: true, id: randomID() },
  { route: 'Вечірня прогулянка 2 км', active: true, id: randomID() },
];

const routeSlice = createSlice({
  name: 'route',
  initialState: initialState,
  reducers: {
    addRoute: state => {
      state.push({ route: '', active: true, id: randomID() });
    },
    deleteRoute: (state, { payload }) => {
      return state.filter((_, i) => payload.index !== i);
    },
    editeRoute: (state, { payload }) => {
      const { input, index } = payload;
      state[index].route = input;
    },
    toggleActiveRoute: (state, { payload }) => {
      state[payload.index].active = !state[payload.index].active;
    },
  },
});

export const { addRoute, deleteRoute, editeRoute, toggleActiveRoute } =
  routeSlice.actions;

export default routeSlice.reducer;
