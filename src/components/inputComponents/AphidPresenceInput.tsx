import { useDispatch, useSelector } from "react-redux";
import { setAphidPresence } from "../../store/userDecisionSlice";
import type { RootState } from "../../store/store";

function AphidPresenceInput() {
  const dispatch = useDispatch();
  const aphidPresence = useSelector((state: RootState) => state.userDecision.aphidPresence);

  return (
    <section className="bg-white rounded border border-gray-300 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-4">Aphid Presence</h2>
        <p className="text-gray-700 mb-6">Have you observed aphids in your field?</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className={`px-6 py-3 rounded border-2 font-medium transition-all duration-200 min-w-[120px]
              ${aphidPresence === "yes"
                ? "bg-green-700 text-white border-green-700 hover:bg-green-800 hover:border-green-800"
                : "bg-white border-gray-400 text-gray-700 hover:bg-green-50 hover:border-green-600 hover:text-green-700"}
            `}
            onClick={() => dispatch(setAphidPresence("yes"))}
          >
            Yes
          </button>
          <button
            className={`px-6 py-3 rounded border-2 font-medium transition-all duration-200 min-w-[120px]
              ${aphidPresence === "no"
                ? "bg-green-700 text-white border-green-700 hover:bg-green-800 hover:border-green-800"
                : "bg-white border-gray-400 text-gray-700 hover:bg-green-50 hover:border-green-600 hover:text-green-700"}
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