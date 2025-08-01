import { useDispatch, useSelector } from "react-redux";
import { setFarmInfo } from "../store/userDecisionSlice";
import type { RootState } from "../store/store";
import H2 from "./H2";

interface FarmInformationInputOptions {
  label: string;
  placeholder: string;
}

function FarmInformationInput({ label, placeholder, value, onChange, name }: FarmInformationInputOptions & {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg">{label}</div>
      <input
        className="py-1 px-2 border-2 border-black rounded-md text-right"
        type="text"
        maxLength={10}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </div>
  );
}

function FarmInfo() {
  const dispatch = useDispatch();
  const farmInfo = useSelector((state: RootState) => state.userDecision.farmInfo);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(
      setFarmInfo({
        field1: e.target.name === "field1" ? e.target.value : farmInfo?.field1 || "",
        field2: e.target.name === "field2" ? e.target.value : farmInfo?.field2 || "",
        field3: e.target.name === "field3" ? e.target.value : farmInfo?.field3 || "",
      })
    );
  };

  return (
    <div className="flex flex-col items-center my-8">
      <H2 text="You're almost there!" />
      <p className="mt-2 mb-6">We just need some basic information about your fields.</p>
      <div className="flex flex-col border-2 border-black rounded-3xl p-4 gap-4 shadow-lg max-w-2xl">
        <FarmInformationInput
          label="How many total acres are in use?"
          placeholder="125"
          value={farmInfo?.field1 || ""}
          onChange={handleChange}
          name="field1"
        />
        <FarmInformationInput
          label="What is your estimated yield? (in pounds)"
          placeholder="2,200"
          value={farmInfo?.field2 || ""}
          onChange={handleChange}
          name="field2"
        />
        <FarmInformationInput
          label="What is your seeding rate? (pounds per acre)"
          placeholder="2,200"
          value={farmInfo?.field3 || ""}
          onChange={handleChange}
          name="field3"
        />
      </div>
    </div>
  );
}

export default FarmInfo;