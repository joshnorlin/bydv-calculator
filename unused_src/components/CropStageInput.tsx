import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import { setCropStage } from "../../store/userDecisionSlice";

const cropStages = [
  "seeding",
  "tillering",
  "jointing",
  "booting",
  "heading",
  "ripening",
];

function CropStageInput() {
  const dispatch = useDispatch();
  const selectedStage = useSelector((state: RootState) => state.userDecision.cropStage);

  return (
    <section className="bg-white rounded border border-gray-300 p-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-green-800 mb-6">Which stage are your crops in?</h2>
        <img
          src="../../assets/images/winter-wheat-crop-stages.jpg"
          alt="Winter wheat crop stages"
          className="mb-8 max-w-full rounded border border-gray-300 mx-auto"
          style={{ maxHeight: 300 }}
        />
        <div className="flex flex-wrap gap-3 justify-center max-w-md mx-auto">
          {cropStages.map((stage) => (
            <button
              key={stage}
              className={`px-4 py-2 rounded border-2 font-medium transition-all duration-200 min-w-[100px]
                ${selectedStage === stage
                  ? "bg-green-700 text-white border-green-700 hover:bg-green-800 hover:border-green-800"
                  : "bg-white border-gray-400 text-gray-700 hover:bg-green-50 hover:border-green-600 hover:text-green-700"}
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