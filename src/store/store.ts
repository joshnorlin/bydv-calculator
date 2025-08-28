import { configureStore } from '@reduxjs/toolkit';
import userDecisionReducer from './userDecisionSlice';
import recommendationsReducer from './recommendationsSlice';

export const store = configureStore({
  reducer: {
    userDecision: userDecisionReducer,
    recommendations: recommendationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;