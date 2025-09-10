import type { ConfigType } from '../context/configContext';

export function calculate(inputData: any, config: ConfigType) {
  console.log("start of calculate function")
  let recommendations = [];

  // Map the input data to the expected property names
  const typedInput = {
    aphid_presence: inputData.aphidPresence || inputData.aphid_presence,
    planting_time: inputData.plantedTime || inputData.planting_time,
    crop_stage: inputData.cropStage || inputData.crop_stage
  };
  
  console.log("Mapped input data:", typedInput);
  console.log("Available crop stages:", Object.keys(config.cropStageEffects));
  console.log("Available aphid presences:", Object.keys(config.aphidPresenceCoefficients));
  
  for (let treatment in config.treatmentCost) {
    console.log("\n--- Processing treatment:", treatment, "---");
    
    try {
      console.log("Treatment key:", treatment);
      const predictedYield = predictYield(typedInput, config, treatment);
      console.log("Predicted yield:", predictedYield);
      
      const revenue = calculateRevenue(config, predictedYield, treatment);
      console.log("Revenue:", revenue);
      
      const recommendationData = processResults(revenue, treatment);
      console.log("Recommendation data:", recommendationData);
      
      recommendations.push(recommendationData);
    } catch (error) {
      console.error(`Error processing treatment ${treatment}:`, error);
    }
  }

  return recommendations.sort((a, b) => b.revenue - a.revenue);
}

// Remove unused interface

export function predictYield(
  inputData: {
    aphid_presence: keyof ConfigType['aphidPresenceCoefficients'];
    planting_time: keyof ConfigType['plantingTimeEffects'];
    crop_stage: keyof ConfigType['cropStageEffects'];
  },
  config: ConfigType,
  treatment: string
) {
  console.log('\n--- predictYield ---');
  console.log('Input data:', JSON.stringify(inputData, null, 2));
  
  // Debug: Log all possible values for each category
  console.log('Available treatments:', Object.keys(config.treatmentEffects));
  console.log('Available crop stages:', Object.keys(config.cropStageEffects));
  console.log('Available planting times:', Object.keys(config.plantingTimeEffects));
  console.log('Available aphid presences:', Object.keys(config.aphidPresenceCoefficients));
  
  // Get each effect with proper type assertions
  const aphidEffect = config.aphidPresenceCoefficients[inputData.aphid_presence as keyof typeof config.aphidPresenceCoefficients];
  const plantingEffect = config.plantingTimeEffects[inputData.planting_time as keyof typeof config.plantingTimeEffects];
  const treatmentEffect = config.treatmentEffects[treatment as keyof typeof config.treatmentEffects];
  const cropStageEffect = config.cropStageEffects[inputData.crop_stage as keyof typeof config.cropStageEffects];
  
  // Log each value with validation
  console.log('\n--- Values used in calculation ---');
  console.log('Treatment:', treatment, '=> Effect:', treatmentEffect);
  console.log('Crop stage:', inputData.crop_stage, '=> Effect:', cropStageEffect);
  console.log('Planting time:', inputData.planting_time, '=> Effect:', plantingEffect);
  console.log('Aphid presence:', inputData.aphid_presence, '=> Effect:', aphidEffect);
  console.log('Base yield:', config.baseYield);
  
  // Validate all values
  if (typeof aphidEffect === 'undefined' || 
      typeof plantingEffect === 'undefined' || 
      typeof treatmentEffect === 'undefined' || 
      typeof cropStageEffect === 'undefined') {
    console.error('Missing or invalid effect value. Check the input data matches config keys exactly.');
    return 0;
  }
  
  const yield_hat = config.baseYield * aphidEffect * plantingEffect * treatmentEffect * cropStageEffect;
  
  console.log('\n--- Final Calculation ---');
  console.log(`${config.baseYield} * ${aphidEffect} * ${plantingEffect} * ${treatmentEffect} * ${cropStageEffect} = ${yield_hat}`);
  
  return yield_hat;
}

export function calculateRevenue(config: ConfigType, predictedYield: number, treatment: string) {
  const bushelPrice = config.bushelPrice;
  const treatmentCost = config.treatmentCost[treatment as keyof ConfigType['treatmentCost']] || 0;
  
  if (isNaN(predictedYield) || isNaN(bushelPrice) || isNaN(treatmentCost)) {
    console.error('Invalid values in calculateRevenue:', {
      predictedYield,
      bushelPrice,
      treatmentCost,
      treatment
    });
    return 0;
  }
  
  return (predictedYield * bushelPrice) - treatmentCost;
}

export function processResults(revenue: number, treatment: string) {
  return {
    "treatment": treatment,
    "revenue": revenue
  }
}