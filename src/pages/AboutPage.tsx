function AboutPage() {
  return (
    <div className="flex flex-col items-center flex-1 px-2">
      <div className="w-full max-w-4xl mt-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">About Idaho Wheat Calculator</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Purpose</h2>
          <p className="text-gray-600 mb-6 leading-relaxed">
            The Idaho Wheat Calculator is a specialized tool designed to help farmers make informed decisions 
            about pest management in their wheat crops. By analyzing various factors such as planting status, 
            crop stage, and environmental conditions, this calculator provides tailored recommendations for 
            optimal crop management.
          </p>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4">How It Works</h2>
          <div className="space-y-4 text-gray-600">
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">1</span>
              <p>Enter your farming status and planting information</p>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">2</span>
              <p>Provide details about your crop stage and field conditions</p>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">3</span>
              <p>Input your location information for localized recommendations</p>
            </div>
            <div className="flex items-start">
              <span className="bg-blue-100 text-blue-800 rounded-full w-6 h-6 flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">4</span>
              <p>Receive customized pest management recommendations</p>
            </div>
          </div>

          <h2 className="text-2xl font-semibold text-gray-700 mb-4 mt-8">Features</h2>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Interactive step-by-step guidance</li>
            <li>Location-based recommendations</li>
            <li>Crop stage-specific advice</li>
            <li>Pest presence assessment</li>
            <li>Tailored management strategies</li>
          </ul>
        </div>

        <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
          <h3 className="text-lg font-semibold text-green-800 mb-2">Ready to Get Started?</h3>
          <p className="text-green-700 mb-4">
            Use our calculator to get personalized recommendations for your wheat crops.
          </p>
          <a 
            href="/" 
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Start Calculator
          </a>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
