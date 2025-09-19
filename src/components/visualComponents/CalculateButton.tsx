import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { setRecommendations, setRecommendationsLoading, setRecommendationsError } from "../../store/recommendationsSlice";
import { calculateRecommendations } from "../../utils/calculateRecommendations";
import { useConfig } from "../../context/configContext";
import Button from "@mui/material/Button";

function CalculateButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDecision = useSelector((state: RootState) => state.userDecision);

  const { config } = useConfig();

  const handleCalculate = () => {
    try {
      dispatch(setRecommendationsLoading());
      
      // SHOULDN'T WE BE ABLE TO IMPORT THIS??? WHY ARE WE DEFINING IT??
      const inputData = {
        location: userDecision.location, 
        plantingDate: userDecision.plantingDate,
        plantingStatus: userDecision.plantingStatus
      };
  
      const recommendations = calculateRecommendations(inputData, config);
      
      if (!recommendations || !Array.isArray(recommendations) || recommendations.length === 0) {
        throw new Error('No recommendations were generated');
      }
      
      dispatch(setRecommendations(recommendations));
      
      navigate('/calculator/results');
    } catch (error) {
      console.error('Calculation error:', error);
      dispatch(setRecommendationsError(error instanceof Error ? error.message : 'Failed to calculate recommendations'));
    }
  };

  return (
    <div className="flex flex-col items-center my-8">
      <Button variant="contained" onClick={() => (handleCalculate())}>Hello</Button>
    </div>
  );
}

export default CalculateButton;