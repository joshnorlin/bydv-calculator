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
  const farmInfoComplete = userDecision.farmInfo?.field1 && userDecision.farmInfo?.field2 && userDecision.farmInfo?.field3;
  const canCalculate =
    userDecision.plantedStatus &&
    userDecision.plantedTime &&
    farmInfoComplete &&
    userDecision.cropStage &&
    userDecision.aphidPresence;

  const { config } = useConfig();

  const handleCalculate = () => {
    try {
      dispatch(setRecommendationsLoading());
      
      // Calculate recommendations using the existing calculate function
      console.log("userDecision", userDecision);
      console.log("config", config);
      const recommendations = calculate(userDecision, config);
      
      // Save recommendations to store
      dispatch(setRecommendations(recommendations));
      
      // Navigate to results page
      navigate('/results');
    } catch (error) {
      console.error('Calculation error:', error);
      dispatch(setRecommendationsError('Failed to calculate recommendations'));
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