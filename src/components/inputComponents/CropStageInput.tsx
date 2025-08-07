import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setCropStage } from "../../store/userDecisionSlice";
import cropStageImg from "../../assets/winter-wheat-crop-stages.jpg";

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
    <section className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Which stage are your crops in?</h2>
        <img
          src={cropStageImg}
          alt="Winter wheat crop stages"
          className="mb-8 max-w-full rounded-lg border border-gray-300 shadow-sm mx-auto"
          style={{ maxHeight: 300 }}
        />
        <div className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
          {cropStages.map((stage) => (
            <button
              key={stage}
              className={`px-4 py-2 rounded-xl border-2 font-semibold transition-all duration-200 min-w-[100px]
                ${selectedStage === stage
                  ? "bg-blue-600 text-white border-blue-600 shadow-md hover:bg-blue-700 hover:border-blue-700"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-700"}
              `}
              onClick={() => dispatch(setCropStage(stage))}
              type="button"
            >
              {stage.charAt(0).toUpperCase() + stage.slice(1)}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CropStageInput;