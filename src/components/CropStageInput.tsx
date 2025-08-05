import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setCropStage } from "../store/userDecisionSlice";
import cropStageImg from "../assets/winter-wheat-crop-stages.jpg";

const cropStages = [
  "seeding",
  "tillering",
  "jointing",
  "boot",
  "heading",
  "ripening",
];

function CropStageInput() {
  const dispatch = useDispatch();
  const selectedStage = useSelector((state: RootState) => state.userDecision.cropStage);

  return (
    <section className="bg-white rounded-2xl shadow p-8 flex flex-col items-center border border-gray-200">
      <h2 className="text-xl font-bold mb-4">Which stage are your crops in?</h2>
      <img
        src={cropStageImg}
        alt="Winter wheat crop stages"
        className="mb-6 max-w-full rounded-lg border border-gray-300 shadow"
        style={{ maxHeight: 300 }}
      />
      <div className="flex flex-wrap gap-3 justify-center">
        {cropStages.map((stage) => (
          <button
            key={stage}
            className={`px-4 py-2 rounded-xl border-2 font-medium transition
              ${selectedStage === stage
                ? "bg-blue-600 text-white border-blue-600 shadow"
                : "bg-white border-gray-300 text-gray-800 hover:bg-blue-50 hover:border-blue-400"}
            `}
            onClick={() => dispatch(setCropStage(stage))}
            type="button"
          >
            {stage.charAt(0).toUpperCase() + stage.slice(1)}
          </button>
        ))}
      </div>
    </section>
  );
}

export default CropStageInput;