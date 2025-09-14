import { configureStore } from '@reduxjs/toolkit';
import routeReduces from './routeSlice';

const store = configureStore({
  reducer: {
    routes: routeReduces,
  },
});

export default store;
