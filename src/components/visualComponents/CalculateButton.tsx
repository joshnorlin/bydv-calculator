import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { setRecommendations, setRecommendationsLoading, setRecommendationsError } from "../../store/recommendationsSlice";
import { calculate } from "../../utils/calculate";
import { useConfig } from "../../context/configContext";

function CalculateButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDecision = useSelector((state: RootState) => state.userDecision);

  const { config } = useConfig();

  const handleCalculate = () => {
    try {
      dispatch(setRecommendationsLoading());
      
      // Prepare input data for calculation
      const inputData = {
        aphidPresence: userDecision.aphidPresence,
        plantedTime: userDecision.plantedTime,
        cropStage: userDecision.cropStage
      };
      
      const recommendations = calculate(inputData, config);
      
      if (!recommendations || !Array.isArray(recommendations) || recommendations.length === 0) {
        throw new Error('No recommendations were generated');
      }
      
      // Save recommendations to store
      dispatch(setRecommendations(recommendations));
      
      // Navigate to results page
      navigate('/calculator/results');
    } catch (error) {
      console.error('Calculation error:', error);
      dispatch(setRecommendationsError(error instanceof Error ? error.message : 'Failed to calculate recommendations'));
    }
  };

  return (
    <div className="flex flex-col items-center my-8">
      <button
        className="bg-green-700 text-white px-8 py-3 rounded font-medium mb-6 hover:bg-green-800 transition-colors duration-200"
        onClick={handleCalculate}
      >
        Calculate Recommendations
      </button>
    </div>
  );
}

export default CalculateButton;