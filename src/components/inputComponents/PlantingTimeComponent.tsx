import { useDispatch, useSelector } from "react-redux";
import ListButton from "../visualComponents/ListButton";
import { setPlantedTime } from '../../store/userDecisionSlice';
import type { RootState } from "../../store/store";
import A from "../visualComponents/A";

interface PlantingOptionProps {
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

function PlantingOption({ label, description, selected, onClick }: PlantingOptionProps) {
  return (
    <div className="flex items-center justify-between mb-3 last:mb-0">
      <ListButton handleClick={onClick} text={label} selected={selected} />
      <span className="ml-4 text-sm text-gray-500 font-medium">{description}</span>
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
          Don't know when to plant? Click <A href="/help#planting-times" text="here"/>.
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
          For cool information on planting times, click <A href="/help#planting-times" text="here"/>.
        </p>
      </>
    );
  }

  return (
    <section className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Awesome!</h2>
          <div className="text-gray-600">
            {textContent}
          </div>
        </div>
        <div className="space-y-3">
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
      </div>
    </section>
  );
}

export default PlantingTimeComponent;