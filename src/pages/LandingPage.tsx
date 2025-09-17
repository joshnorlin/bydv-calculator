import { useEffect } from 'react';

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
    <div>
      <div>
        {/* Hero Section */}
        <section>
          <div>
            <h1>
              Small Grains BYDV Calculator
            </h1>
            <p>
              A tool for managing and predicting Barley Yellow Dwarf Virus in small grains
            </p>
            <div>
              <a 
                href="./calculator" 
              >
                Try the Calculator
              </a>
              <a 
                href="./about" 
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* Rest of the content */}
        

      {/* Hero Section */}
      <section id="home">
        <div>
          <div>
            <h1>
              Managing barley yellow dwarf virus and cereal aphids in winter wheat
            </h1>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about">
        <div>
          <div>
            <div>
              <h2>Project Motivation</h2>
              <p>
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
            <div>
              <h2>Objectives</h2>
              <p>
                The project is funded from July 2024 through June 2027, and its objectives include:
              </p>
              <ul>
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
      <section id="team">
        <div>
          <h2>Meet our Team</h2>
          <div>
            {teamMembers.map((member, index) => (
              <div key={index}>
                <img 
                  src={`../../assets/img/${member.photo}`} 
                  alt={member.name} 
                />
                <div>
                  <h3>{member.name}</h3>
                  <p>{member.role}</p>
                  <p>{member.affiliation}</p>
                  <a 
                    href={`mailto:${member.email}`} 
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
      <section id="contact">
        <div>
          <h2>For More Information</h2>
          <div>
            <div>
              <div>
                <i></i>
              </div>
              <div>
                <p>
                  Contact: <strong>Arash Rashed, </strong>
                  <a href="mailto:arashr@vt.edu">
                    arashr@vt.edu
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div>
          <div>
            <div>
              <h3>Acknowledgements:</h3>
              <p>
                This work is supported by the CARE Program from the USDA National Institute of Food and Agriculture. 
                Grant number 2024-68008-42760
              </p>
            </div>
            <div>
              <div>
                <img src="../../assets/img/va-tech-logo.png" alt="Virginia Tech" />
                <img src="../../assets/img/UI_Main_stacked_4c+W.png" alt="University of Idaho" />
              </div>
            </div>
          </div>
          <div>
            <p>© {new Date().getFullYear()} Small Grains BYDV Research. All rights reserved.</p>
          </div>
        </div>
      </footer>
        </div>
      </div>
  );
};

export default LandingPage;
