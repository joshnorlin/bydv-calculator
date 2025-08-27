export function calculate(inputData: any, config: any) {
  let recommendations = [];

  for (let treatment in config["treatmentCosts"]) {
    let predictedYield = predictYield(inputData, config, treatment)
    let revenue = calculateRevenue(config, predictedYield, treatment)
    let recommendationData = processResults(revenue, treatment)
    recommendations.push(recommendationData)
  }

  return recommendations.sort((a, b) => b.revenue - a.revenue);
}

export function predictYield(inputData: any, config: any, treatment: string) {
  let yield_hat = config["baseYield"] + ( config["aphidCoefficient"] * inputData["aphid_density"] ) // define aphid density units later.
    + ( config["infectionCoefficient"] * inputData["infection_rate"] )
    + ( config["treamentEffects"][treatment] )

  return yield_hat;
}

export function calculateRevenue(config: any, predictedYield: number, treatment: string) {
  let revenue = ( predictedYield * config["bushelPrice"] ) - config["treatmentCost"][treatment]
  return revenue;
}

export function processResults(revenue: number, treatment: string) {
  return {
    "treatment": treatment,
    "revenue": revenue
  }
}