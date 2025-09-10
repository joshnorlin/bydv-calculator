import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

// Component imports
import Plantings from '../components/inputComponents/Plantings';
import PlantingTimeComponent from '../components/inputComponents/PlantingTimeComponent';
import CalculateButton from '../components/visualComponents/CalculateButton';

// Interface for decision tree steps
interface DecisionTreeStep {
  key: string; // Unique identifier for each step
  show: boolean; // Whether the step should be displayed
  render: () => React.JSX.Element; // Function to render the step component
}

// Custom hook for managing decision tree steps
const useDecisionTreeSteps = (): DecisionTreeStep[] => {
  // Get user decision state from Redux store
  const {
    plantedStatus,
    plantedTime,
  } = useSelector((state: RootState) => state.userDecision);

  // Check if farm info is complete

  // Array of decision tree steps
  const steps: DecisionTreeStep[] = [
    {
      key: "non-farmer",
      show: plantedStatus === "non-farmer",
      render: () => (
        <div className="bg-gray-50 border border-gray-200 rounded-2xl p-8 text-center">
          <div className="text-2xl text-gray-700 font-medium mb-2">
            Thanks for visiting! This tool is designed for farmers.
          </div>
          <div className="text-gray-600">
            In the future, we’d love to provide a sample walk-through, share resources
            for academics, or help you support your farmer friends.
          </div>
        </div>
      ),
    },
    {
      key: "plantings",
      show: plantedStatus !== "non-farmer",
      render: () => <Plantings />,
    },
    {
      key: "planting-time",
      show: plantedStatus === "planted" || plantedStatus === "not-planted",
      render: () => <PlantingTimeComponent />,
    },
    {
      key: "calculate-btn",
      show: Boolean(plantedTime),
      render: () => <CalculateButton />,
    },
  ];

  return steps;
};

export default useDecisionTreeSteps;
