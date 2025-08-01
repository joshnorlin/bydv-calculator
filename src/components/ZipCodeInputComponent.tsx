import { useDispatch, useSelector } from "react-redux";
import { setZipCode } from '../store/userDecisionSlice';
import type { RootState } from "../store/store";
import A from "./A";
import H2 from "./H2";

function ZipCodeInputComponent() {
  const dispatch = useDispatch();
  const zipCode = useSelector((state: RootState) => state.userDecision.zipCode);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setZipCode(e.target.value));
  };

  return (
    <section className="justify-center flex m-4 py-6 border-y-2 border-black bg-gray-50">
      <div className="mx-6 flex flex-col items-start justify-center">
        <h2 className="text-3xl font-bold mb-4">Last question, I promise.</h2>
        <div>
          <p className="text-left mb-2 max-w-xs">
            Please enter your farm's zip code to help us calculate the area's crop disease risk factor.
          </p>
          <p className="text-left text-sm text-gray-500 max-w-xs">
            Not sure about sharing your location? Click <A href="#" text="here"/> to learn why we ask for this.
          </p>
        </div>
      </div>
      <div className="mx-6 flex flex-col border-2 border-black rounded-2xl pt-4 px-4 pb-2 bg-white drop-shadow-lg">
        <H2 text="Enter your zip code" />
        <input
          type="text"
          className="border border-gray-300 rounded-md p-2"
          value={zipCode || ""}
          onChange={handleChange}
          maxLength={10}
          placeholder="Zip code"
        />
      </div>
    </section>
  );
}

export default ZipCodeInputComponent;