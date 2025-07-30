import H2 from "./H2";

interface FarmInformationInputOptions {
  label: string;
  placeholder: string;
}

function FarmInformationInput({ label, placeholder }: FarmInformationInputOptions) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-lg">{label}</div>
      <input className="py-1 px-2 border-2 border-black rounded-md text-right" type="text" max="10" placeholder={placeholder}></input>
    </div>
  );
}

function FarmInfo() {
  // <p> into a component, subheading component or something.

  return (
    <div className="flex flex-col">
      <H2 text="You're almost there!"/>
      <p className="mt-2 mb-6">We just need some basic information about your fields.</p>
      <div className="flex flex-col border-2 border-black rounded-3xl p-4 gap-4 shadow-lg">
        <FarmInformationInput label="How many total acres are in use?" placeholder="125"/>
        <FarmInformationInput label="What is your estimated yield? (in pounds)" placeholder="2,200"/>
        <FarmInformationInput label="What is your seeding rate? (pounds per acre)" placeholder="2,200"/>
      </div>
    </div>
  )
}

export default FarmInfo;