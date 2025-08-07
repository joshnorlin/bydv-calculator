import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function HelpPage() {
  const location = useLocation();

  useEffect(() => {
    // Scroll to anchor if present in URL
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location]);

  const qaItems = [
    {
      id: 'pest-management',
      question: 'What are pest management techniques for wheat?',
      answer: (
        <div className="space-y-4">
          <p>
            Effective pest management in wheat involves an integrated approach combining multiple strategies:
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800">1. Cultural Control</h4>
              <p className="text-gray-600">
                Crop rotation, proper planting dates, and field sanitation help reduce pest populations naturally.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">2. Biological Control</h4>
              <p className="text-gray-600">
                Encouraging beneficial insects like ladybugs, parasitic wasps, and predatory mites that naturally control pest populations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">3. Chemical Control</h4>
              <p className="text-gray-600">
                Strategic use of insecticides when pest thresholds are exceeded, focusing on targeted applications to minimize environmental impact.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">4. Monitoring & Scouting</h4>
              <p className="text-gray-600">
                Regular field inspections to identify pest problems early and make informed treatment decisions.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'planting-times',
      question: 'When should I plant winter wheat in Idaho?',
      answer: (
        <div className="space-y-4">
          <p>
            Optimal planting timing for winter wheat in Idaho depends on your specific location and weather conditions:
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800">Early Planting (Mid-September)</h4>
              <p className="text-gray-600">
                Allows for better root development and tillering before winter, but increases risk of pest problems and winter injury if plants grow too large.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Optimal Timing (Mid to Late October)</h4>
              <p className="text-gray-600">
                Generally provides the best balance of fall growth and winter survival. Plants establish adequate root systems without excessive top growth.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Late Planting (Late November)</h4>
              <p className="text-gray-600">
                May result in reduced yields due to insufficient fall growth, but can be successful in milder winters with good spring conditions.
              </p>
            </div>
          </div>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mt-4">
            <p className="text-blue-800">
              <strong>Tip:</strong> Monitor soil temperature and moisture conditions. Plant when soil temperature is consistently above 50°F for optimal germination.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'location-privacy',
      question: 'Why do you need my location information?',
      answer: (
        <div className="space-y-4">
          <p>
            We request your zip code to provide more accurate and localized recommendations:
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800">Weather Data Integration</h4>
              <p className="text-gray-600">
                Local weather patterns, temperature ranges, and precipitation data help determine pest pressure and optimal treatment timing.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Regional Pest Populations</h4>
              <p className="text-gray-600">
                Different regions have varying pest species and population densities. Location data helps identify the most relevant threats.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Soil and Climate Conditions</h4>
              <p className="text-gray-600">
                Regional soil types and microclimates affect crop development and pest management strategies.
              </p>
            </div>
          </div>
          <div className="bg-green-50 border-l-4 border-green-400 p-4 mt-4">
            <p className="text-green-800">
              <strong>Privacy:</strong> We only use your zip code for calculations and do not store or share your location data with third parties.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'crop-stages',
      question: 'How do I identify wheat crop growth stages?',
      answer: (
        <div className="space-y-4">
          <p>
            Understanding wheat growth stages is crucial for timing pest management decisions:
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800">Seeding Stage</h4>
              <p className="text-gray-600">
                From planting until emergence. Critical period for seed and seedling pests like wireworms and cutworms.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Tillering Stage</h4>
              <p className="text-gray-600">
                Plants develop additional shoots from the base. Aphids and other sucking insects may become problematic.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Jointing Stage</h4>
              <p className="text-gray-600">
                Stem elongation begins. Important timing for certain herbicide applications and pest monitoring.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Boot Stage</h4>
              <p className="text-gray-600">
                Head development within the stem. Critical period for head-feeding insects and disease management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Heading Stage</h4>
              <p className="text-gray-600">
                Wheat heads emerge from boot. Monitor for head-feeding pests like wheat head armyworm.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Ripening Stage</h4>
              <p className="text-gray-600">
                Grain filling and maturation. Pest management becomes less critical as harvest approaches.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'aphid-identification',
      question: 'How do I identify aphids in my wheat field?',
      answer: (
        <div className="space-y-4">
          <p>
            Aphids are small, soft-bodied insects that can significantly impact wheat yields if left unmanaged:
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800">Visual Identification</h4>
              <p className="text-gray-600">
                Look for small (1-4mm), pear-shaped insects in green, brown, or black colors. They cluster on leaves, stems, and heads.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Damage Symptoms</h4>
              <p className="text-gray-600">
                Yellowing leaves, stunted growth, sticky honeydew on plants, and sooty mold growth on honeydew deposits.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Common Species</h4>
              <p className="text-gray-600">
                Russian wheat aphid, bird cherry-oat aphid, and English grain aphid are the most problematic in Idaho wheat.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Monitoring Tips</h4>
              <p className="text-gray-600">
                Check plants weekly during active growing season. Look on undersides of leaves and in plant whorls.
              </p>
            </div>
          </div>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mt-4">
            <p className="text-yellow-800">
              <strong>Economic Threshold:</strong> Treatment is typically recommended when 5-10% of plants show aphid colonies during vegetative growth.
            </p>
          </div>
        </div>
      )
    },
    {
      id: 'farm-information',
      question: 'Why do you need information about my farm size and yields?',
      answer: (
        <div className="space-y-4">
          <p>
            Farm-specific information helps us provide economically sound pest management recommendations:
          </p>
          <div className="space-y-3">
            <div>
              <h4 className="font-semibold text-gray-800">Economic Analysis</h4>
              <p className="text-gray-600">
                Treatment costs must be weighed against potential yield losses. Larger operations may justify different management strategies.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Scale-Appropriate Solutions</h4>
              <p className="text-gray-600">
                Small farms may benefit from different approaches than large commercial operations due to equipment and labor considerations.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">Risk Assessment</h4>
              <p className="text-gray-600">
                Higher-value crops or larger investments may warrant more intensive monitoring and management programs.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col items-center flex-1 px-4 py-8">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Help & Frequently Asked Questions</h1>
          <p className="text-lg text-gray-600">
            Find answers to common questions about wheat farming and pest management
          </p>
        </div>

        {/* Table of Contents */}
        <div className="bg-blue-50 rounded-2xl p-6 mb-8 border border-blue-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Navigation</h2>
          <div className="grid md:grid-cols-2 gap-2">
            {qaItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-blue-600 hover:text-blue-800 hover:underline transition-colors p-2 rounded-lg hover:bg-blue-100"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(item.id)?.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                  });
                }}
              >
                {item.question}
              </a>
            ))}
          </div>
        </div>

        {/* Q&A Items */}
        <div className="space-y-8">
          {qaItems.map((item, index) => (
            <div
              key={item.id}
              id={item.id}
              className="bg-white rounded-2xl shadow-md p-8 border border-gray-200 scroll-mt-4"
            >
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <span className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">
                  {index + 1}
                </span>
                {item.question}
              </h2>
              <div className="text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="bg-green-50 rounded-2xl p-8 mt-12 border border-green-200 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Still Have Questions?</h2>
          <p className="text-gray-600 mb-6">
            If you can't find the answer you're looking for, don't hesitate to reach out to your local extension office or agricultural advisor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              Back to Calculator
            </a>
            <a
              href="/about"
              className="inline-block bg-white text-green-600 border border-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
            >
              Learn More About This Tool
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;
