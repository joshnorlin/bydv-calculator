import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import Header from './components/Header';
import CalculatorInformation from './components/CalculatorInformation';
import Plantings from './components/Plantings';
import PlantingTimeComponent from "./components/PlantingTimeComponent";
import FarmInfo from "./components/FarmInfo";
import ZipCodeInputComponent from "./components/ZipCodeInputComponent";
import CalculateButton from "./components/CalculateButton";
import Recommendations from "./components/Recommendations";

// Placeholder components for steps not yet implemented
const CropStageComponent = () => <div>Which stage are your crops in?</div>;
const AphidPresenceComponent = () => <div>Collect aphid presence data</div>;

function App() {
  const {
    plantedStatus,
    plantedTime,
    cropStage,
    aphidPresence,
    farmInfo, // { field1, field2, field3 }
    zipCode,
    calculated,
  } = useSelector((state: RootState) => state.userDecision);

  const mainContent: React.ReactNode[] = [];

  // Always show Plantings first
  mainContent.push(<Plantings key="plantings" />);

  // If plantedStatus is answered, show PlantingTimeComponent
  if (plantedStatus === "planted" || plantedStatus === "not-planted") {
    mainContent.push(<PlantingTimeComponent key="planting-time" />);
  }

  // If planted, ask for crop stage
  if (plantedStatus === "planted" && plantedTime) {
    mainContent.push(<CropStageComponent key="crop-stage" />);
  }

  // If not planted, show farm info
  if (plantedStatus === "not-planted" && plantedTime) {
    mainContent.push(<FarmInfo key="farm-info" />);
  }

  // If planted and crops are in early stage, ask for aphid presence
  if (plantedStatus === "planted" && cropStage === "early") {
    mainContent.push(<AphidPresenceComponent key="aphid-presence" />);
  }

  // If planted and crops are in late stage, show info message
  if (plantedStatus === "planted" && cropStage === "late") {
    mainContent.push(<div key="late-stage-msg">It doesn't really matter at this stage.</div>);
  }

  // If not planted and farm info is complete, show zip code input
  const farmInfoComplete = farmInfo?.field1 && farmInfo?.field2 && farmInfo?.field3;
  if (plantedStatus === "not-planted" && farmInfoComplete) {
    mainContent.push(<ZipCodeInputComponent />);
  }

  // If planted, early stage, aphid data collected, show zip code input
  if (
    plantedStatus === "planted" &&
    cropStage === "early" &&
    aphidPresence &&
    farmInfoComplete
  ) {
    mainContent.push(<ZipCodeInputComponent key="zip-code-planted" />);
  }

  // If all info is entered, show calculate button
  const allInfoEntered =
    ((plantedStatus === "not-planted" && farmInfoComplete && zipCode) ||
      (plantedStatus === "planted" && cropStage && ((cropStage === "early" && aphidPresence && zipCode) || cropStage === "late" && zipCode)));

  if (allInfoEntered && !calculated) {
    mainContent.push(<CalculateButton />);
  }

  // If calculate button is hit, show recommendations
  if (calculated) {
    mainContent.push(<Recommendations />);
  }

  // Handle non-farmer case
  if (plantedStatus === "non-farmer") {
    mainContent.length = 0;
    mainContent.push(<div key="not-a-farmer">Not a farmer</div>);
  }

  return (
    <div>
      <Header />
      <CalculatorInformation />
      {mainContent}
    </div>
  );
}

export default App;
