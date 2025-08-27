import A from "../visualComponents/A";

function CalculatorInformation() {
  return (
    <div className="text-center py-8 px-4">
      {/*<h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-8">Small Grains BYDV Calculator</h1>*/}
      <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <div className="bg-white rounded p-6 flex flex-col justify-between h-full">
          <h2 className="text-3xl font-bold font-montserrat text-gray-700 uppercase mb-3">What is this page about?</h2>
          <p className="text-gray-700 font-opensans font-base leading-relaxed">
            This page helps farmers better understand <A href="/help#pest-management" text="pest management techniques"/> and become more aware of their agricultural situation.
          </p>
        </div>
        <div className="bg-white rounded p-6 flex flex-col justify-between h-full">
          <h2 className="text-3xl font-bold font-montserrat text-gray-700 uppercase mb-3">
            How you can use this page.
          </h2>
          <p className="text-gray-700 font-opensans font-base leading-relaxed">
            Enter information about your crops and farming season, then find out which pest methods may be best for you, keeping your revenue in mind.
          </p>
        </div>
      </div>
    </div>
  )
}

export default CalculatorInformation;