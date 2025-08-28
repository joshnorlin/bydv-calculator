import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { setCalculated } from "../../store/userDecisionSlice";
import { calculate } from "../../utils/calculate";
import config from "../../../data.config.json";

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

  const handleCalculate = () => {
    calculate(userDecision, config)
    dispatch(setCalculated(true));
    // Navigate to results page after calculation
    navigate('/results');
  };

  return (
    <div className="flex flex-col items-center my-8">
      {canCalculate && !userDecision.calculated && (
        <button
          className="bg-green-700 text-white px-8 py-3 rounded font-medium mb-6 hover:bg-green-800 transition-colors duration-200"
          onClick={handleCalculate}
        >
          Calculate Recommendations
        </button>
      )}
      {userDecision.calculated && (
        <div className="w-full max-w-xl bg-gray-50 rounded p-4 border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Current State Info (placeholder):</h2>
          <pre className="text-xs bg-white p-2 rounded">{JSON.stringify(userDecision, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CalculateButton;