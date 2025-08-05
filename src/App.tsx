import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import Header from './components/Header';
import CalculatorInformation from './components/CalculatorInformation';
import Plantings from './components/inputComponents/Plantings';
import PlantingTimeComponent from "./components/inputComponents/PlantingTimeComponent";
import FarmInfo from "./components/inputComponents/FarmInfo";
import ZipCodeInputComponent from "./components/inputComponents/ZipCodeInputComponent";
import CalculateButton from "./components/CalculateButton";
import Recommendations from "./components/Recommendations";
import CropStageInput from "./components/inputComponents/CropStageInput";
import AphidPresenceInput from "./components/inputComponents/AphidPresenceInput";

function App() {
  const {
    plantedStatus,
    plantedTime,
    cropStage,
    aphidPresence,
    farmInfo,
    zipCode,
    calculated,
  } = useSelector((state: RootState) => state.userDecision);

  const mainContent: React.ReactNode[] = [];

  // Always show Plantings first
  mainContent.push(<Plantings key="plantings" />);
  if (plantedStatus === "planted" || plantedStatus === "not-planted") {
    mainContent.push(<PlantingTimeComponent key="planting-time" />);
  }
  if (plantedStatus === "planted" && plantedTime) {
    mainContent.push(<CropStageInput key="crop-stage" />);
  }
  if (plantedStatus === "not-planted" && plantedTime) {
    mainContent.push(<FarmInfo key="farm-info" />);
  }
  if (plantedStatus === "planted" && cropStage === "seeding") {
    mainContent.push(<AphidPresenceInput key="aphid-presence" />);
  }
  if (plantedStatus === "planted" && cropStage === "ripening") {
    mainContent.push(<div key="late-stage-msg" className="text-center text-lg text-gray-700 my-8">At this stage, pest management is less critical.</div>);
  }
  const farmInfoComplete = farmInfo?.field1 && farmInfo?.field2 && farmInfo?.field3;
  if (plantedStatus === "not-planted" && farmInfoComplete) {
    mainContent.push(<ZipCodeInputComponent key="zip-code-not-planted" />);
  }
  if (
    plantedStatus === "planted" &&
    cropStage === "seeding" &&
    aphidPresence &&
    farmInfoComplete
  ) {
    mainContent.push(<ZipCodeInputComponent key="zip-code-planted" />);
  }
  const allInfoEntered =
    ((plantedStatus === "not-planted" && farmInfoComplete && zipCode) ||
      (plantedStatus === "planted" && cropStage && ((cropStage === "seeding" && aphidPresence && zipCode) || cropStage === "ripening" && zipCode)));
  if (allInfoEntered && !calculated) {
    mainContent.push(<CalculateButton key="calculate-btn" />);
  }
  if (calculated) {
    mainContent.push(<Recommendations key="recommendations" />);
  }
  if (plantedStatus === "non-farmer") {
    mainContent.length = 0;
    mainContent.push(
      <div key="not-a-farmer" className="text-center text-2xl text-gray-700 my-16">
        Thanks for visiting! This tool is designed for farmers.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-100 flex flex-col">
      <Header />
      <main className="flex flex-col items-center flex-1 px-2">
        <CalculatorInformation />
        <div className="w-full max-w-2xl mt-8 space-y-8">{mainContent}</div>
      </main>
      <footer className="text-center text-gray-400 py-4 text-sm">
        &copy; {new Date().getFullYear()} Idaho Wheat Calculator
      </footer>
    </div>
  );
}

export default App;
