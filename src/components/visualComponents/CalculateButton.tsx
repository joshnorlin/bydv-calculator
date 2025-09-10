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

  // Check if all required info is entered
  // is this already calculated in the decisionTreeSteps hook? might not be bad to double check, but not sure if it's needed.
  const farmInfoComplete = Boolean(
    userDecision.farmInfo?.field1 &&
    userDecision.farmInfo?.field2 &&
    userDecision.farmInfo?.field3
  );
  // Match useDecisionTreeSteps: show button as soon as Farm Info is complete
  const canCalculate = farmInfoComplete;

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
      
      console.log("Input data for calculation:", JSON.stringify(inputData, null, 2));
      console.log("Configuration:", JSON.stringify({
        baseYield: config.baseYield,
        aphidCoefficients: config.aphidPresenceCoefficients,
        plantingEffects: config.plantingTimeEffects,
        treatmentEffects: config.treatmentEffects,
        cropStageEffects: config.cropStageEffects
      }, null, 2));
      
      const recommendations = calculate(inputData, config);
      console.log("Recommendations:", recommendations);
      
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
      {canCalculate && (
        <button
          className="bg-green-700 text-white px-8 py-3 rounded font-medium mb-6 hover:bg-green-800 transition-colors duration-200"
          onClick={handleCalculate}
        >
          Calculate Recommendations
        </button>
      )}
    </div>
  );
}

export default CalculateButton;