import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Recommendation {
  treatment: string;
  revenue: number;
}

interface RecommendationsState {
  recommendations: Recommendation[];
  loading: boolean;
  error: string | null;
}

const initialState: RecommendationsState = {
  recommendations: [],
  loading: false,
  error: null,
};

const recommendationsSlice = createSlice({
  name: 'recommendations',
  initialState,
  reducers: {
    setRecommendations: (state, action: PayloadAction<Recommendation[]>) => {
      state.recommendations = action.payload;
      state.loading = false;
      state.error = null;
    },
    setRecommendationsLoading: (state) => {
      state.loading = true;
      state.error = null;
    },
    setRecommendationsError: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearRecommendations: (state) => {
      state.recommendations = [];
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setRecommendations,
  setRecommendationsLoading,
  setRecommendationsError,
  clearRecommendations,
} = recommendationsSlice.actions;

export default recommendationsSlice.reducer;
