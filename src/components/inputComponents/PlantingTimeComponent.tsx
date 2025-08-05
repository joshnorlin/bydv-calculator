import { useDispatch, useSelector } from "react-redux";
import ListButton from "./ListButton";
import { setPlantedTime } from '../store/userDecisionSlice';
import type { RootState } from "../store/store";
import A from "./A";

interface PlantingOptionProps {
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function PlantingOption({ label, description, selected, onClick }: PlantingOptionProps) {
  return (
    <div className="flex items-center justify-between mb-4">
      <ListButton handleClick={onClick} text={label} selected={selected} />
      <span className="whitespace-nowrap overflow-hidden ml-3 text-gray-600">{description}</span>
    </div>
  );
}

function PlantingTimeComponent() {
  const dispatch = useDispatch();
  const plantedStatus = useSelector((state: RootState) => state.userDecision.plantedStatus);
  const plantedTime = useSelector((state: RootState) => state.userDecision.plantedTime);
  
  let textContent = null;

  if (plantedStatus === "not-planted") {
    textContent = (
      <>
        <p className="text-left mb-2 max-w-xs">
          Great, <span className="font-bold">what part of the season</span> do you <span className="font-bold">plan on planting?</span>
        </p>
        <p className="text-left text-sm text-gray-500 max-w-xs">
          Don't know when to plant? Click <A href="#" text="here"/>.
        </p>
      </>
    );
  } else if (plantedStatus === "planted") {
    textContent = (
      <>
        <p className="text-left mb-2 max-w-xs">
          Great, <span className="font-bold">which part of the season</span> did you plant?
        </p>
        <p className="text-left text-sm text-gray-500 max-w-xs">
          For cool information on planting times, click <A href="#" text="here"/>.
        </p>
      </>
    );
  }

  return (
    <section className="justify-center flex m-4 py-6 border-y-2 border-black bg-gray-50">
      <div className="mx-6 flex flex-col items-start justify-center">
        <h2 className="text-3xl font-bold mb-4">Awesome!</h2>
        {textContent}
      </div>
      <div className="mx-6 flex flex-col border-2 border-black rounded-2xl pt-4 px-4 pb-2 bg-white drop-shadow-lg">
        <PlantingOption
          label="Early!"
          description="mid-September"
          selected={plantedTime === 'early'}
          onClick={() => dispatch(setPlantedTime('early'))}
        />
        <PlantingOption
          label="On time."
          description="mid- to late-October"
          selected={plantedTime === 'on-time'}
          onClick={() => dispatch(setPlantedTime('on-time'))}
        />
        <PlantingOption
          label="A little later."
          description="late-November"
          selected={plantedTime === 'late'}
          onClick={() => dispatch(setPlantedTime('late'))}
        />
      </div>
    </section>
  );
}

export default PlantingTimeComponent;