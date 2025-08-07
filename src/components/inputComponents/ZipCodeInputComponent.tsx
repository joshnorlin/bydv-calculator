import { useDispatch, useSelector } from "react-redux";
import { setZipCode } from '../../store/userDecisionSlice';
import type { RootState } from "../../store/store";
import A from "../visualComponents/A";

function ZipCodeInputComponent() {
  const dispatch = useDispatch();
  const zipCode = useSelector((state: RootState) => state.userDecision.zipCode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setZipCode(e.target.value));
  };

  return (
    <section className="bg-white rounded-2xl shadow-md p-8 border border-gray-200">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Last question, I promise.</h2>
          <div className="text-gray-600 space-y-2">
            <p>
              Please enter your farm's zip code to help us calculate the area's crop disease risk factor.
            </p>
            <p className="text-sm text-gray-500">
              Not sure about sharing your location? Click <A href="/help#location-privacy" text="here"/> to learn why we ask for this.
            </p>
          </div>
        </div>
        <div className="max-w-sm mx-auto md:mx-0">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Enter your zip code
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            value={zipCode || ""}
            onChange={handleChange}
            maxLength={10}
            placeholder="Zip code"
          />
        </div>
      </div>
    </section>
  );
}

export default ZipCodeInputComponent;