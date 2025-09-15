import { useDispatch, useSelector } from "react-redux";
import ListButton from "../visualComponents/ListButton";
import type { RootState } from "../../store/store";

function Plantings() {
  const dispatch = useDispatch();
  const plantedStatus = useSelector((state: RootState) => state.userDecision.plantingDate);

  /*
    all components are now expecting deleted userDecisionSlice variables.
    TODO:
      - ponder the minimum input variables needed. maybe just "have you planted?", 
      if not, don't ask "when they plan to plant hahaha". if so, ask when they planted. ask for location first.
      we need a chance for them to change their wheat prices, but start with a default price obviously.
  */
 
  return (
    <section className="bg-white rounded border border-gray-300 p-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-800 mb-4">Let's get started</h1>
        <h2 className="text-lg text-gray-700 mb-6">
          We'll start simple. <span className="font-semibold text-gray-800">Have you planted your wheat yet?</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <ListButton
            handleClick={() => dispatch(setPlantedStatus(''))}
            text="Yes!"
            selected={plantedStatus === 'planted'}
          />
          <ListButton
            handleClick={() => dispatch(setPlantingDate(null))}
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