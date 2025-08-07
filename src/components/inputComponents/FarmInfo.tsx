import { useDispatch, useSelector } from "react-redux";
import { setFarmInfo } from "../../store/userDecisionSlice";
import type { RootState } from "../../store/store";

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
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
      <label className="text-sm font-medium text-gray-700 sm:flex-1">{label}</label>
      <input
        className="px-3 py-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors sm:w-32 text-right"
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
    <section className="bg-white rounded border border-gray-300 p-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-green-800 mb-2">You're almost there!</h2>
        <p className="text-gray-700">We just need some basic information about your fields.</p>
      </div>
      <div className="space-y-6 max-w-lg mx-auto">
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
    </section>
  );
}

export default FarmInfo;