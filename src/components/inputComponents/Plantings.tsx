import { useDispatch, useSelector } from "react-redux";
import ListButton from "../visualComponents/ListButton";
import { setPlantedStatus } from "../../store/userDecisionSlice";
import type { RootState } from "../../store/store";

function Plantings() {
  const dispatch = useDispatch();
  const plantedStatus = useSelector((state: RootState) => state.userDecision.plantedStatus);

  return (
    <section className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Let's get started</h1>
        <h2 className="text-lg text-gray-600 mb-6">
          We'll start simple. <span className="font-semibold text-gray-800">Have you planted your wheat yet?</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <ListButton
            handleClick={() => dispatch(setPlantedStatus('planted'))}
            text="Yes!"
            selected={plantedStatus === 'planted'}
          />
          <ListButton
            handleClick={() => dispatch(setPlantedStatus('not-planted'))}
            text="No, not yet."
            selected={plantedStatus === 'not-planted'}
          />
          <ListButton
            handleClick={() => dispatch(setPlantedStatus('non-farmer'))}
            text="I'm not a farmer..."
            selected={plantedStatus === 'non-farmer'}
          />
        </div>
      </div>
    </section>
  )
}

export default Plantings;