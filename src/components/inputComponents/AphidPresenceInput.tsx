import { useDispatch, useSelector } from "react-redux";
import { setAphidPresence } from "../../store/userDecisionSlice";
import type { RootState } from "../../store/store";

function AphidPresenceInput() {
  const dispatch = useDispatch();
  const aphidPresence = useSelector((state: RootState) => state.userDecision.aphidPresence);

  return (
    <section className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Aphid Presence</h2>
        <p className="text-gray-600 mb-6">Have you observed aphids in your field?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-200 min-w-[120px]
              ${aphidPresence === "yes"
                ? "bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700 hover:border-blue-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700"}
            `}
            onClick={() => dispatch(setAphidPresence("yes"))}
          >
            Yes
          </button>
          <button
            className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-200 min-w-[120px]
              ${aphidPresence === "no"
                ? "bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700 hover:border-blue-700"
                : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700"}
            `}
            onClick={() => dispatch(setAphidPresence("no"))}
          >
            No
          </button>
        </div>
      </div>
    </section>
  );
}

export default AphidPresenceInput;