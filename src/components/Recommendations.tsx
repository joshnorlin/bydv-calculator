import { useSelector } from "react-redux";
import type { RootState } from "../store/store";

function Recommendations() {
  const userDecision = useSelector((state: RootState) => state.userDecision);

  // Only show if calculated is true
  if (!userDecision.calculated) return null;

  return (
    <div className="flex flex-col items-center my-8">
      <h2 className="text-2xl font-bold mb-4">Your Farm Recommendations (placeholder)</h2>
      <div className="w-full max-w-xl bg-gray-100 rounded-xl p-4 border border-gray-300">
        <h3 className="text-lg font-semibold mb-2">Entered Information:</h3>
        <pre className="text-xs bg-white p-2 rounded">{JSON.stringify(userDecision, null, 2)}</pre>
      </div>
    </div>
  );
}

export default Recommendations