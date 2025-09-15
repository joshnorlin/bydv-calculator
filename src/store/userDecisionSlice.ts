import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LocationType, PlantingDateType, PlantingStatusType } from '../types/types';

interface UserDecisionState {
  plantingStatus: PlantingStatusType
  plantingDate: PlantingDateType,
  location: LocationType,
}

const initialState: UserDecisionState = {
  plantingStatus: null,
  plantingDate: null,
  location: null
};

const userDecisionSlice = createSlice({
  name: 'userDecision',
  initialState,
  reducers: {
    setPlantingStatus(state, action: PayloadAction<PlantingStatusType>) {
      state.plantingStatus = action.payload;
    },
    setPlantingDate(state, action: PayloadAction<PlantingDateType>) {
      state.plantingDate = action.payload;
    },
    setLocation(state, action: PayloadAction<LocationType>) {
      state.location = action.payload;
    }
  },
});

export const { setPlantingStatus, setPlantingDate, setLocation } = userDecisionSlice.actions;

export default userDecisionSlice.reducer;