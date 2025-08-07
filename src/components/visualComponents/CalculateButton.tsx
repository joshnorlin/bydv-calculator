import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../../store/store";
import { setCalculated } from "../../store/userDecisionSlice";

function CalculateButton() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userDecision = useSelector((state: RootState) => state.userDecision);

  // Check if all required info is entered
  const farmInfoComplete = userDecision.farmInfo?.field1 && userDecision.farmInfo?.field2 && userDecision.farmInfo?.field3;
  const canCalculate =
    userDecision.plantedStatus &&
    userDecision.plantedTime &&
    farmInfoComplete &&
    userDecision.zipCode;

  const handleCalculate = () => {
    dispatch(setCalculated(true));
    // Navigate to results page after calculation
    navigate('/results');
  };

  return (
    <div className="flex flex-col items-center my-8">
      {canCalculate && !userDecision.calculated && (
        <button
          className="bg-blue-500 text-white px-6 py-2 rounded-xl font-bold mb-6"
          onClick={handleCalculate}
        >
          Calculate
        </button>
      )}
      {userDecision.calculated && (
        <div className="w-full max-w-xl bg-gray-100 rounded-xl p-4 border border-gray-300">
          <h2 className="text-lg font-semibold mb-2">Current State Info (placeholder):</h2>
          <pre className="text-xs bg-white p-2 rounded">{JSON.stringify(userDecision, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default CalculateButton;