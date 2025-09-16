import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

// Component imports
import Location from '../components/inputComponents/Location';
import PlantingStatus from '../components/inputComponents/PlantingStatus';
import PlantingDate from '../components/inputComponents/PlantingDate';
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
    location,
    plantingStatus,
    plantingDate,
  } = useSelector((state: RootState) => state.userDecision);

  // Check if farm info is complete

  // Array of decision tree steps
  const steps: DecisionTreeStep[] = [
    {
      key: "enterLocation",
      show: true, // can change this condition in the future.
      render: () => <Location />
    },
    {
      key: "validLocation",
      show: Boolean(location !== null && location !== 'not-applicable'),
      render: () => <PlantingStatus />
    },
    {
      key: "invalidLocation",
      show: Boolean(location === 'not-applicable'),
      render: () => (
        <div>placeholder "not applicable" info component</div>
      ) // CHANGE THIS COMPONENT NAME
    },
    {
      key: "hasPlanted",
      show: Boolean(plantingStatus === 'planted'),
      render: () => <PlantingDate />
    },
    {
      key: "hasNotPlanted",
      show: Boolean(plantingStatus === 'not-planted'),
      render: () => (
        <div>placeholder ugh, you've haven't planted? let's help.</div> // PLACEHOLDER HTML, WHAT WILL THE FLOW BE?
      ),
    },
    {
      key: "isNotAFarmer",
      show: Boolean(plantingStatus === 'not-farmer'),
      render: () => ( // PLACEHOLDER COMPONENT, WHAT WILL THE EDUCATIVE PROCESS BE?
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
      key: "validInfo",
      show: Boolean(
        (location && plantingStatus === 'planted' && plantingDate) ||
        (location && plantingStatus === 'not-planted')
        // ADD EDUCATIVE STATE VARIABLES FOR 'NOT-FARMER'
    ),
      render: () => <CalculateButton />,
    },
  ];

  return steps;
};

export default useDecisionTreeSteps;
