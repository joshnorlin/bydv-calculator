import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LocationType, PlantingDateType } from '../types/types';

interface UserDecisionState {
  plantingDate: PlantingDateType,
  location: LocationType,
}

const initialState: UserDecisionState = {
  plantingDate: null,
  location: null
};

const userDecisionSlice = createSlice({
  name: 'userDecision',
  initialState,
  reducers: {
    setPlantingDate(state, action: PayloadAction<PlantingDateType>) {
      state.plantingDate = action.payload;
    },
    setLocation(state, action: PayloadAction<LocationType>) {
      state.location = action.payload;
    }
  },
});

export const { setPlantingDate, setLocation } = userDecisionSlice.actions;

export default userDecisionSlice.reducer;