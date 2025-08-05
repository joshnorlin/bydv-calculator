import { useDispatch, useSelector } from "react-redux";
import { setAphidPresence } from "../store/userDecisionSlice";
import type { RootState } from "../store/store";

function AphidPresenceInput() {
  const dispatch = useDispatch();
  const aphidPresence = useSelector((state: RootState) => state.userDecision.aphidPresence);

  return (
    <section className="bg-white rounded-2xl shadow p-8 flex flex-col items-center border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Aphid Presence</h2>
      <p className="mb-4 text-gray-700">Have you observed aphids in your field?</p>
      <div className="flex gap-4">
        <button
          className={`px-6 py-2 rounded-xl border-2 font-semibold transition
            ${aphidPresence === "yes"
              ? "bg-blue-600 text-white border-blue-600 shadow"
              : "bg-white border-gray-300 text-gray-800 hover:bg-blue-50 hover:border-blue-400"}
          `}
          onClick={() => dispatch(setAphidPresence("yes"))}
        >
          Yes
        </button>
        <button
          className={`px-6 py-2 rounded-xl border-2 font-semibold transition
            ${aphidPresence === "no"
              ? "bg-blue-600 text-white border-blue-600 shadow"
              : "bg-white border-gray-300 text-gray-800 hover:bg-blue-50 hover:border-blue-400"}
          `}
          onClick={() => dispatch(setAphidPresence("no"))}
        >
          No
        </button>
      </div>
    </section>
  );
}

export default AphidPresenceInput;