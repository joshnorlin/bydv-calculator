import { Button } from "@mui/material";
// import { calculateRecommendations } from "../utils/calculateRecommendations";
import { draft } from "../utils/draft";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type {InputDataType } from "../types/types";
import type { AppDispatch, RootState } from "../store/store";
import config from "../../data.config.json";
import { setRecommendations } from "../store/recommendationsSlice";
import { createSelector } from "@reduxjs/toolkit";

const typedConfig = config as any;

export function CalculateButton() {
  const inputDataIsValid = (inputData: InputDataType) => {
    if (
      (
        inputData.location === 'rusty' ||
        inputData.location === 'sparec' ||
        inputData.location === 'warsaw'
      ) &&
      (
        (
          inputData.plantingStatus === 'planted' &&
          (
            inputData.plantingDate === 'sept-oct' ||
            inputData.plantingDate === 'oct-nov' ||
            inputData.plantingDate === 'nov-dec'
          )
        ) ||
        inputData.plantingStatus === 'not-planted'
      )
    ) return true;
    else {
      return false;
    }
  }

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClick = (inputData: InputDataType, dispatch: AppDispatch) => {
    // Use the new draft() function which returns a nested object:
    // { [location]: { [date]: { [treatment]: profit|null } } }
    const profitsByLocation = draft(inputData, typedConfig);

    const loc = inputData.location;
    const flattened: { date: string; treatment: string; profit: number }[] = [];
    if (loc && profitsByLocation[loc]) {
      const byDate = profitsByLocation[loc];
      for (const [date, byTreatment] of Object.entries(byDate)) {
        for (const [treatment, profit] of Object.entries(byTreatment)) {
          const p = profit ?? 0;
          flattened.push({ date, treatment, profit: p });
        }
      }
    }

    dispatch(setRecommendations(flattened));
    navigate("recommendations");
  }

  const selectUserDecisionSlice = (state: RootState) => state.userDecision;
  const selectUserDecision = createSelector(
    [selectUserDecisionSlice],
    (userDecision) => userDecision
  );
  const userDecisionSlice = useSelector(selectUserDecision);

  if (inputDataIsValid(userDecisionSlice)) {
    return (
      <Button
        variant="contained"
        onClick={() => handleClick(userDecisionSlice, dispatch)}
      >
        See recommendations
      </Button>
    );
  } else {
    return <div>Not displaying Button.</div>
  }
}