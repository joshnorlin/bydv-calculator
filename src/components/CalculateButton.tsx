import { Button } from "@mui/material";
import { calculateRecommendations } from "../utils/calculateRecommendations";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { ConfigType, InputDataType } from "../types/types";
import type { AppDispatch, RootState } from "../store/store";
import config from "../../data.config.json";
import { setRecommendations } from "../store/recommendationsSlice";

const typedConfig = config as ConfigType;

export function CalculateButton() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleClick = (inputData: InputDataType, dispatch: AppDispatch) => {
    const recommendations = calculateRecommendations(inputData, typedConfig);
    dispatch(setRecommendations(recommendations));
    navigate("/recommendations");
  }

  const inputData: InputDataType = useSelector((state: RootState) => ({
    location: state.userDecision.location,
    plantingStatus: state.userDecision.plantingStatus,
    plantingDate: state.userDecision.plantingDate,
  }));

  return (
    <Button
      variant="contained"
      onClick={() => handleClick(inputData, dispatch)}
    >
      See recommendations
    </Button>
  );
}