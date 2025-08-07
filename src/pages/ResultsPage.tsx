import { useSelector } from "react-redux";
import type { RootState } from "../store/store";
import Recommendations from "../components/outputComponents/Recommendations";
import { Link } from "react-router-dom";

function ResultsPage() {
  const { calculated } = useSelector((state: RootState) => state.userDecision);

  if (!calculated) {
    return (
      <div className="flex flex-col items-center flex-1 px-2">
        <div className="w-full max-w-2xl mt-8 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Results Available</h2>
          <p className="text-gray-600 mb-6">
            Please complete the calculator on the home page to view recommendations.
          </p>
          <Link 
            to="/" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Go to Calculator
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center flex-1 px-2">
      <div className="w-full max-w-2xl mt-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
          >
            ← Back to Calculator
          </Link>
        </div>
        <Recommendations />
      </div>
    </div>
  );
}

export default ResultsPage;
