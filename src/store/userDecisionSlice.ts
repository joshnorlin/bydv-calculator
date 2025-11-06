import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { LocationType, PlantingDateType, PlantingStatusType } from '../types/types';
import { BUSHEL_PRICE_IN_DOLLARS } from '../config/constants';

interface UserDecisionState {
  plantingStatus: PlantingStatusType,
  plantingDate: PlantingDateType,
  location: LocationType,
  county: string | undefined,
  bushelPrice: number,
}

const initialState: UserDecisionState = {
  plantingStatus: null,
  plantingDate: null,
  location: null,
  county: undefined,
  bushelPrice: BUSHEL_PRICE_IN_DOLLARS,
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
    },
    setCounty(state, action: PayloadAction<string | undefined>) {
      state.county = action.payload;
    },
    setBushelPrice(state, action: PayloadAction<number>) {
      state.bushelPrice = action.payload;
    }
  },
});

export const { setPlantingStatus, setPlantingDate, setLocation, setCounty, setBushelPrice } = userDecisionSlice.actions;

export default userDecisionSlice.reducer;