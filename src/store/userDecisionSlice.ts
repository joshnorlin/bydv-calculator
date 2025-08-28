import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

export type PlantedStatusOptions = 'planted' | 'not-planted' | 'non-farmer' | null;
export type PlantedTimeOptions = 'early' | 'on-time' | 'late' | null;

interface UserDecisionState {
  plantedStatus: PlantedStatusOptions;
  plantedTime: string | null;
  cropStage?: string | null;
  aphidPresence?: string | null;
  farmInfo?: { field1: string; field2: string; field3: string };
  zipCode?: string | null;
  calculated?: boolean;
}

const initialState: UserDecisionState = {
  plantedStatus: null,
  plantedTime: null,
  cropStage: null,
  aphidPresence: null,
  farmInfo: { field1: "", field2: "", field3: "" },
  zipCode: null,
  calculated: false,
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
    },
    setZipCode(state, action: PayloadAction<string>) {
      state.zipCode = action.payload;
    },
    setFarmInfo(state, action: PayloadAction<{ field1: string; field2: string; field3: string }>) {
      state.farmInfo = action.payload;
    },
    setCalculated(state, action: PayloadAction<boolean>) {
      state.calculated = action.payload;
    },
    setCropStage(state, action: PayloadAction<string>) {
      state.cropStage = action.payload;
    },
    setAphidPresence(state, action: PayloadAction<string>) {
      state.aphidPresence = action.payload;
    },
  },
});

export const { setPlantedStatus, setPlantedTime, setZipCode, setFarmInfo, setCalculated, setCropStage, setAphidPresence } =
userDecisionSlice.actions;

export default userDecisionSlice.reducer;