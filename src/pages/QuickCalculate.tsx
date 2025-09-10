import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const QuickCalculate = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    cropType: 'wheat',
    growthStage: '',
    infectionDate: '',
    aphidCount: '',
    fieldSize: '',
    previousTreatment: 'none',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Process form data and navigate to results
    navigate('/calculator/results', { state: { quickCalculate: true, ...formData } });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Quick Calculate</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Crop Type</label>
          <select
            name="cropType"
            value={formData.cropType}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="wheat">Wheat</option>
            <option value="barley">Barley</option>
            <option value="oats">Oats</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Current Growth Stage</label>
          <select
            name="growthStage"
            value={formData.growthStage}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="">Select growth stage</option>
            <option value="seedling">Seedling</option>
            <option value="tillering">Tillering</option>
            <option value="stem_elongation">Stem Elongation</option>
            <option value="booting">Booting</option>
            <option value="heading">Heading</option>
            <option value="flowering">Flowering</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">First Observed Infection Date</label>
          <input
            type="date"
            name="infectionDate"
            value={formData.infectionDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Aphid Count per Till</label>
          <input
            type="number"
            name="aphidCount"
            value={formData.aphidCount}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Field Size (acres)</label>
          <input
            type="number"
            name="fieldSize"
            value={formData.fieldSize}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            min="0"
            step="0.1"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Previous Treatment</label>
          <select
            name="previousTreatment"
            value={formData.previousTreatment}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="none">None</option>
            <option value="insecticide">Insecticide</option>
            <option value="biological">Biological Control</option>
            <option value="cultural">Cultural Practices</option>
          </select>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Calculate Risk
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuickCalculate;
