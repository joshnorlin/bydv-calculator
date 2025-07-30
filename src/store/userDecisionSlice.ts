import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type PlantedStatusOptions = 'planted' | 'not-planted' | 'non-farmer' | null;
export type PlantedTimeOptions = 'early' | 'on-time' | 'late' | null;

interface UserDecisionState {
  plantedStatus: PlantedStatusOptions,
  plantedTime: PlantedTimeOptions
}

const initialState: UserDecisionState = {
  plantedStatus: null,
  plantedTime: null,
};

const userDecisionSlice = createSlice({
  name: 'userDecision',
  initialState,
  reducers: {
    setPlantedStatus(state, action: PayloadAction<PlantedStatusOptions>) {
      state.plantedStatus = action.payload;
    },
    setPlantedTime(state, action: PayloadAction<PlantedTimeOptions>) {
      state.plantedTime = action.payload;
    }
  },
});

export const { setPlantedStatus, setPlantedTime } = userDecisionSlice.actions;

export default userDecisionSlice.reducer;