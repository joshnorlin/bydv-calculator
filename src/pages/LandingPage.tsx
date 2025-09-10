import { useEffect } from 'react';
import '../assets/css/styles.css';

const LandingPage = () => {
  useEffect(() => {
    // Placeholder: reserved for future scroll-based effects if needed
  }, []);

  const teamMembers = [
    {
      name: 'Dr. Arash Rashed',
      role: 'Director and Professor of Entomology',
      affiliation: 'Virginia Tech',
      email: 'arashr@vt.edu',
      photo: 'arash_rashed.jpg'
    },
    {
      name: 'Dr. Patrick Hatzenbuehler',
      role: 'Assistant Professor and Extension Specialist',
      affiliation: 'University of Idaho',
      email: 'phatzenbuehler@uidaho.edu',
      photo: 'pat_hatzenbuehler.jpg'
    },
    // Add other team members here
  ];

  return (
    <div className="font-sans min-h-screen" style={{
      backgroundImage: 'url(/src/assets/images/Firefly_BYDV_r4.jpg)',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundAttachment: 'fixed'
    }}>
      <div className="min-h-screen bg-black bg-opacity-60 text-gray-100">
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-4">
          <div className="container mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
              Small Grains BYDV Calculator
            </h1>
            <p className="text-xl text-white mb-8 max-w-3xl mx-auto">
              A tool for managing and predicting Barley Yellow Dwarf Virus in small grains
            </p>
            <div className="space-x-4">
              <a 
                href="./calculator" 
                className="bg-teal-600 hover:bg-teal-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-block"
              >
                Try the Calculator
              </a>
              <a 
                href="./about" 
                className="bg-transparent hover:bg-white hover:bg-opacity-10 text-white font-bold py-3 px-6 border-2 border-white rounded-lg transition duration-300 inline-block"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Rest of the content */}
        

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="animate-fadeInUp">
              Managing barley yellow dwarf virus and cereal aphids in winter wheat
            </h1>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about-section">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="about-card">
              <h2 className="text-3xl font-bold text-gray-50 mb-6">Project Motivation</h2>
              <p className="mb-4">
                <strong>Barley yellow dwarf virus (BYDV)</strong>, transmitted by several species of cereal aphids, 
                is the most important viral disease of winter cereals globally, and has been a threat to winter 
                wheat in the southeastern U.S. in recent years.
              </p>
              <p>
                Although integrated pest management (IPM) is the most effective approach to managing BYDV and aphids, 
                the recommended strategies in the southeastern U.S. (i.e., planting date, seed treatment, and/or 
                timing of foliar insecticide application) are based on information generated more than two decades 
                ago, which no longer fit our current climate patterns or best management practices.
              </p>
            </div>
            <div className="about-card">
              <h2 className="text-3xl font-bold text-gray-50 mb-6">Objectives</h2>
              <p className="mb-4">
                The project is funded from July 2024 through June 2027, and its objectives include:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Identifying regional reservoirs of barley yellow dwarf virus and aphid vectors</li>
                <li>Establishing field plots to determine and demonstrate appropriate practices to minimize the virus</li>
                <li>Estimating farm profitability implications of damage with decision-support tools</li>
                <li>Developing educational material and workshop opportunities to increase grower awareness</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section id="team" className="team-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-100">Meet our Team</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="team-member">
                <img 
                  src={`../../assets/img/${member.photo}`} 
                  alt={member.name} 
                  className="team-photo"
                />
                <div className="text-center md:text-left">
                  <h3 className="text-2xl font-bold text-gray-800">{member.name}</h3>
                  <p className="text-gray-600 font-medium">{member.role}</p>
                  <p className="text-gray-600 mb-3">{member.affiliation}</p>
                  <a 
                    href={`mailto:${member.email}`} 
                    className="text-teal-600 hover:text-teal-800 text-sm"
                  >
                    {member.email}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact-section">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12 text-gray-100">For More Information</h2>
          <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <div className="contact-info">
              <div className="contact-icon">
                <i className="bi bi-envelope"></i>
              </div>
              <div>
                <p className="text-gray-700">
                  Contact: <strong>Arash Rashed, </strong>
                  <a href="mailto:arashr@vt.edu" className="text-teal-600 hover:underline">
                    arashr@vt.edu
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Acknowledgements:</h3>
              <p className="text-gray-300">
                This work is supported by the CARE Program from the USDA National Institute of Food and Agriculture. 
                Grant number 2024-68008-42760
              </p>
            </div>
            <div className="flex flex-col items-center md:items-end justify-center space-y-4">
              <div className="flex space-x-8">
                <img src="../../assets/img/va-tech-logo.png" alt="Virginia Tech" className="h-16" />
                <img src="../../assets/img/UI_Main_stacked_4c+W.png" alt="University of Idaho" className="h-16" />
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© {new Date().getFullYear()} Small Grains BYDV Research. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </div>
      </div>
  );
};

export default LandingPage;
