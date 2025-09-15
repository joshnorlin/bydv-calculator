import { useDispatch, useSelector } from "react-redux";
import ListButton from "../visualComponents/ListButton";
import { setPlantingDate } from '../../store/userDecisionSlice';
import type { RootState } from "../../store/store";
import A from "../visualComponents/A";

interface PlantingOptionProps {
  label: string;
  description: string;
  selected: boolean;
  onClick: () => void;
} // UGH I HATE THIS

function PlantingOption({ label, description, selected, onClick }: PlantingOptionProps) {
  return (
    <div className="flex items-center justify-between mb-3 last:mb-0">
      <ListButton handleClick={onClick} text={label} selected={selected} />
      <span className="ml-4 text-sm text-gray-500 font-medium">{description}</span>
    </div>
  );
}

/* TO-DO
  -  REFACTOR THIS WHOLE THING!!
  - the labels in the PlantingOption function don't make any sense.
*/

function PlantingDate() {
  const dispatch = useDispatch();
  const plantingDate = useSelector((state: RootState) => state.userDecision.plantingDate);

  return (
    <section className="bg-white rounded border border-gray-300 p-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-green-800 mb-4">Awesome!</h2>
          <div className="text-gray-700">
            <p className="text-left mb-2 max-w-xs">
              Great, <span className="font-bold">when</span> did you plant?
            </p>
            <p className="text-left text-sm text-gray-500 max-w-xs">
              For cool information on planting times, click <A href="/help#planting-times" text="here"/>.
            </p>
          </div>
        </div>
        <div className="space-y-3">
          <PlantingOption
            label="Early!"
            description="mid-September"
            selected={plantingDate === 'sept-oct'}
            onClick={() => dispatch(setPlantingDate('sept-oct'))}
          />
          <PlantingOption
            label="On time."
            description="mid- to late-October"
            selected={plantingDate === 'oct-nov'}
            onClick={() => dispatch(setPlantingDate('oct-nov'))}
          />
          <PlantingOption
            label="A little later."
            description="late-November"
            selected={plantingDate === 'nov-dec'}
            onClick={() => dispatch(setPlantingDate('nov-dec'))}
          />
        </div>
      </div>
    </section>
  );
}

export default PlantingDate;