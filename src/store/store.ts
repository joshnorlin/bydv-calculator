import { configureStore } from '@reduxjs/toolkit';
import userDecisionReducer from './userDecisionSlice';

export const store = configureStore({
  reducer: {
    userDecision: userDecisionReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;