import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userDecisionReducer from './userDecisionSlice';
import recommendationsReducer from './recommendationsSlice';

const userDecisionPersistConfig = {
  key: 'userDecision',
  storage,
}

const recommendationsPersistConfig = {
  key: 'recommendations',
  storage,
}

const persistedUserDecisionReducer = persistReducer(userDecisionPersistConfig, userDecisionReducer);
const persistedRecommendationsReducer = persistReducer(recommendationsPersistConfig, recommendationsReducer);

export const store = configureStore({
  reducer: {
    userDecision: persistedUserDecisionReducer,
    recommendations: persistedRecommendationsReducer,
  },
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;