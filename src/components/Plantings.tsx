import { useDispatch, useSelector } from "react-redux";
import ListButton from "./ListButton";
import { setPlantedStatus } from "../store/userDecisionSlice";
import type { RootState } from "../store/store";

function Plantings() {
  const dispatch = useDispatch();
  const plantedStatus = useSelector((state: RootState) => state.userDecision.plantedStatus);

  return (
    <div className="flex flex-col justify-center items-center border-t-2 border-black">
      <h1 className="font-bold text-4xl py-4">Let's get started</h1>
      <h2 className="text-xl">We'll start simple. <span className="font-bold">Have you planted your wheat yet?</span></h2>
      <div className="m-4">
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
  )
}

export default Plantings;