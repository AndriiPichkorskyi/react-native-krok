import { configureStore } from '@reduxjs/toolkit';
import routeReduces from './routeSlice';
import userReducer from './userSlice';
import stepsReducer from './stepsSlice';

const store = configureStore({
  reducer: {
    routes: routeReduces,
    user: userReducer,
    steps: stepsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
