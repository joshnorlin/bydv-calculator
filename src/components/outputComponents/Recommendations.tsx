import { useSelector } from "react-redux";
import type { RootState } from "../../store/store";
import type { Recommendation } from "../../store/recommendationsSlice";

function Recommendations() {
  const { recommendations, loading, error } = useSelector((state: RootState) => state.recommendations);

  if (loading) {
    return (
      <div>
        <div>
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p>Calculating recommendations…</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div>
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!recommendations || recommendations.length === 0) {
    return (
      <div>
        <div>
          <div>
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <p>
                No recommendations available. Please complete the calculator to see your personalized recommendations.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Sort by revenue (highest first)
  const sortedRecommendations: Recommendation[] = [...recommendations].sort((a, b) => b.profit - a.profit);
  // Determine a continuation (baseline) revenue:
  // 1) Prefer a treatment that looks like "no treatment"/"none"
  // 2) Otherwise use the lowest revenue as a conservative baseline
  const explicitBaseline = sortedRecommendations.find(r => /^(none|no[ _-]?treat(ment)?)$/i.test(r.treatment));
  const contRevenue = explicitBaseline
    ? explicitBaseline.profit
    : (sortedRecommendations[sortedRecommendations.length - 1]?.profit ?? 0);

  return (
    <div>
      <h2>Your Farm Management Recommendations</h2>
      
      <div>
        <div>
          <h3>
            Comparison with No Action (Continuation) Option
          </h3>
          <p>
            The following options are compared to doing nothing (continuation).
          </p>
        </div>
        
        <div>
          <dl>
            {sortedRecommendations.map((rec, index) => (
              <div 
                key={index}
              >
                <dt>
                  {rec.treatment}
                  <span>
                    {/* Badge removed */}
                  </span>
                </dt>
                <dd>
                  <div>
                    <div>
                      <p>Revenue</p>
                      <p>${rec.profit.toLocaleString()}</p>
                      {contRevenue !== 0 && (
                        <p>
                          {rec.profit >= contRevenue ? '↑' : '↓'} 
                          {Math.abs(((rec.profit - contRevenue) / contRevenue) * 100).toFixed(1)}% 
                          {rec.profit >= contRevenue ? 'higher' : 'lower'} than continuation
                        </p>
                      )}
                    </div>
                    {/* Additional metrics like cost/profit can be displayed when available in state */}
                    <div>
                      <details>
                        <summary>
                          <span>▶</span>
                          More about this treatment
                        </summary>
                        <div>
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
      
      <div>
        <div>
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h3>How to interpret these results</h3>
            <div>
              <ul>
                <li><span>Best Choice:</span> Significantly better than doing nothing (20%+ better revenue)</li>
                <li><span>Good Option:</span> Slightly better than doing nothing (5-20% better revenue)</li>
                <li><span>Not Recommended:</span> Worse than doing nothing (lower revenue)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Recommendations;