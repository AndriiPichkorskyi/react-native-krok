import { createSelector, createSlice } from '@reduxjs/toolkit';

const initialState = [
  { route: 'Ранкова прогулянка 3 км', active: true },
  { route: 'Обідня прогулянка 3 км', active: true },
  { route: 'Вечірня прогулянка 2 км', active: true },
];

const routeSlice = createSlice({
  name: 'route',
  initialState: initialState,
  reducers: {
    addRoute: state => {
      state.push({ route: '', active: true });
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
