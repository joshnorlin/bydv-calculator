import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { Recommendation } from "../../store/recommendationsSlice";

function Recommendations() {
  const { recommendations, loading, error } = useSelector((state: RootState) => state.recommendations);

  if (loading) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">Calculating recommendations…</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border-l-4 border-red-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div className="w-full max-w-4xl mx-auto p-6">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                No recommendations available. Please complete the calculator to see your personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sort by revenue (highest first)
  const sortedRecommendations: Recommendation[] = [...recommendations].sort((a, b) => b.revenue - a.revenue);
  // Determine a continuation (baseline) revenue:
  // 1) Prefer a treatment that looks like "no treatment"/"none"
  // 2) Otherwise use the lowest revenue as a conservative baseline
  const explicitBaseline = sortedRecommendations.find(r => /^(none|no[ _-]?treat(ment)?)$/i.test(r.treatment));
  const contRevenue = explicitBaseline
    ? explicitBaseline.revenue
    : (sortedRecommendations[sortedRecommendations.length - 1]?.revenue ?? 0);

  // Sort recommendations by profit (highest first)
  // const sortedByProfit = [...recommendations].sort((a, b) => b.profit - a.profit);

  const getRecommendationColor = (revenue: number) => {
    if (!contRevenue) return 'bg-white';
    
    const percentageDifference = ((revenue - contRevenue) / contRevenue) * 100;
    
    if (revenue < contRevenue) return 'bg-gray-100';
    if (percentageDifference >= 20) return 'bg-green-50 border-l-4 border-green-500';
    if (percentageDifference >= 5) return 'bg-green-50 border-l-4 border-yellow-400';
    
    return 'bg-white';
  };

  const getRecommendationBadge = (revenue: number) => {
    if (!contRevenue) return null;
    
    const percentageDifference = ((revenue - contRevenue) / contRevenue) * 100;
    
    if (revenue < contRevenue) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
          Not Recommended
        </span>
      );
    }
    
    if (percentageDifference >= 20) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
          Best Choice
        </span>
      );
    }
    
    if (percentageDifference >= 5) {
      return (
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
          Good Option
        </span>
      );
    }
    
    return null;
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Farm Management Recommendations</h2>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-8">
        <div className="px-4 py-5 sm:px-6 bg-gray-50">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Comparison with No Action (Continuation) Option
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            The following options are compared to doing nothing (continuation).
          </p>
        </div>
        
        <div className="border-t border-gray-200">
          <dl>
            {sortedRecommendations.map((rec, index) => (
              <div 
                key={index}
                className={`px-6 py-6 sm:grid sm:grid-cols-4 sm:gap-6 sm:px-8 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} ${getRecommendationColor(rec.revenue)}`}
              >
                <dt className="text-sm font-medium text-gray-500 flex items-center whitespace-nowrap">
                  {rec.treatment}
                  <span className="ml-2">
                    {getRecommendationBadge(rec.revenue)}
                  </span>
                </dt>
                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-3">
                  <div className="grid grid-cols-3 gap-8 items-center">
                    <div>
                      <p className="text-xs text-gray-500">Revenue</p>
                      <p className="font-medium whitespace-nowrap">${rec.revenue.toLocaleString()}</p>
                      {contRevenue !== 0 && (
                        <p className={`text-xs ${rec.revenue >= contRevenue ? 'text-green-600' : 'text-red-600'} whitespace-nowrap`}>
                          {rec.revenue >= contRevenue ? '↑' : '↓'} 
                          {Math.abs(((rec.revenue - contRevenue) / contRevenue) * 100).toFixed(1)}% 
                          {rec.revenue >= contRevenue ? 'higher' : 'lower'} than continuation
                        </p>
                      )}
                    </div>
                    {/* Additional metrics like cost/profit can be displayed when available in state */}
                    <div className="col-span-3 mt-2">
                      <details className="group">
                        <summary className="flex items-center cursor-pointer select-none text-sm text-gray-700 whitespace-nowrap">
                          <span className="mr-2 inline-block transform transition-transform group-open:rotate-90">▶</span>
                          More about this treatment
                        </summary>
                        <div className="mt-2 text-sm text-gray-600">
                          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                        </div>
                      </details>
                    </div>
                  </div>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
      
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">How to interpret these results</h3>
            <div className="mt-2 text-sm text-blue-700">
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="font-medium">Best Choice:</span> Significantly better than doing nothing (20%+ better revenue)</li>
                <li><span className="font-medium">Good Option:</span> Slightly better than doing nothing (5-20% better revenue)</li>
                <li><span className="font-medium">Not Recommended:</span> Worse than doing nothing (lower revenue)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;