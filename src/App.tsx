import { useSelector } from "react-redux";
import type { RootState } from "./store/store";
import Header from './components/Header';
import CalculatorInformation from './components/CalculatorInformation';
import Plantings from './components/Plantings';
import PlantingTimeComponent from "./components/PlantingTimeComponent";
import FarmInfo from "./components/FarmInfo";

function App() {
  const { plantedStatus, plantedTime } = useSelector((state: RootState) => state.userDecision);

  // Use an array to accumulate components
  const mainContent: React.ReactNode[] = [];

  // Always show Plantings first
  mainContent.push(<Plantings key="plantings" />);

  // If plantedStatus is answered, show PlantingTimeComponent (if needed)
  if (plantedStatus === "planted" || plantedStatus === "not-planted") {
    mainContent.push(<PlantingTimeComponent key="planting-time" />);
  }

  // If both plantedStatus and plantedTime are answered, show FarmInfo
  if (
    (plantedStatus === "not-planted" && plantedTime) ||
    (plantedStatus === "planted" && plantedTime) // adjust this for your actual logic
  ) {
    mainContent.push(<FarmInfo key="farm-info" />);
  }

  // Handle non-farmer case
  if (plantedStatus === "non-farmer") {
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
