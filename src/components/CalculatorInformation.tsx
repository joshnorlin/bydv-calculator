import A from "./A";

function CalculatorInformation() {
  return (
    <div className="flex flex-col items-center justify-evenly bg-gray-50 py-4 gap-5">
      <h1 className="text-4xl font-bold">Calculators</h1>
      <div className="flex justify-center">
        <div className="flex flex-col items-center justify-start gap-3 mx-8 my-4">
          <h2 className="font-bold text-2xl">What is this page about?</h2>
          <h2 className="text-center max-w-sm">this page helps farmers better understand <A href="#" text="pest management techniques"/> and become more aware of their agricultural situation.</h2>
        </div>
        <div className="flex flex-col items-center justify-center gap-3 mx-8 my-4">
          <h2 className="font-bold text-2xl">How to use this page?</h2>
          <h2 className="text-center max-w-sm">enter information about your crops and farming season, then find out which pest methods may be best for you, keeping your revenue in mind.</h2>
        </div>
      </div>
    </div>
  )
}

export default CalculatorInformation;