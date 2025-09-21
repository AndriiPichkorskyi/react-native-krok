import { type RootState } from './store';

export const userSelector = (state: RootState) => state.user;
export const rotueSelector = (state: RootState) => state.routes;

export const stepsSelector = (state: RootState) => state.steps.count;
