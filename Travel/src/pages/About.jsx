export default function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        <section className="about-header">
          <h1>About Travel Explorer</h1>
          <p className="tagline">Discover the world, one country at a time.</p>
        </section>

        <section className="about-content">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              Travel Explorer aims to inspire and empower travelers to discover new destinations,
              learn about different cultures, and plan their next adventure. We provide comprehensive
              information about countries around the world to help you make informed decisions about
              your travels.
            </p>
          </div>

          <div className="about-section">
            <h2>What We Offer</h2>
            <ul>
              <li>🌍 Comprehensive country information and statistics</li>
              <li>❤️ Ability to save and manage your favorite countries</li>
              <li>🔍 Advanced search and filtering capabilities</li>
              <li>🌙 Dark and light theme options for comfortable browsing</li>
              <li>📱 Responsive design for all devices</li>
              <li>⚡ Fast and efficient data access</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Technology Stack</h2>
            <div className="tech-stack">
              <div className="tech-item">
                <h4>Frontend</h4>
                <p>React with Hooks, React Router for navigation, Context API for state management</p>
              </div>
              <div className="tech-item">
                <h4>APIs</h4>
                <p>REST Countries API for country data, DummyJSON API for user profiles</p>
              </div>
              <div className="tech-item">
                <h4>Styling</h4>
                <p>CSS3 with responsive design principles</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Key Features</h2>
            <div className="features-grid">
              <div className="feature">
                <h4>✨ Dynamic Routing</h4>
                <p>Seamless navigation between pages without reloading</p>
              </div>
              <div className="feature">
                <h4>🔗 URL Parameters</h4>
                <p>Direct access to country details via country codes</p>
              </div>
              <div className="feature">
                <h4>🎨 Theme Switching</h4>
                <p>Toggle between light and dark modes anytime</p>
              </div>
              <div className="feature">
                <h4>💾 Global State Management</h4>
                <p>Persistent favorites across the entire application</p>
              </div>
              <div className="feature">
                <h4>🔎 Search & Filter</h4>
                <p>Find countries by name or region</p>
              </div>
              <div className="feature">
                <h4>📊 Detailed Information</h4>
                <p>Population, capital, languages, currency, and more</p>
              </div>
            </div>
          </div>

          <div className="about-section">
            <h2>Data Sources</h2>
            <p>
              Our application uses two primary data sources:
            </p>
            <ul>
              <li>
                <strong>REST Countries API:</strong> Provides comprehensive country data including
                flags, population, capitals, currencies, and languages. Visit{' '}
                <a href="https://restcountries.com" target="_blank" rel="noopener noreferrer">
                  restcountries.com
                </a>
              </li>
              <li>
                <strong>DummyJSON API:</strong> Supplies user profile information for demonstration
                purposes. Visit{' '}
                <a href="https://dummyjson.com" target="_blank" rel="noopener noreferrer">
                  dummyjson.com
                </a>
              </li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Learning Outcomes</h2>
            <p>This project demonstrates proficiency in:</p>
            <ul>
              <li>✅ React Hooks (useState, useEffect, useContext)</li>
              <li>✅ React Router for Single Page Applications</li>
              <li>✅ Context API for global state management</li>
              <li>✅ API integration and data fetching</li>
              <li>✅ Dynamic routing with URL parameters</li>
              <li>✅ Search and filtering functionality</li>
              <li>✅ Responsive web design</li>
              <li>✅ Component composition and reusability</li>
            </ul>
          </div>

          <div className="about-section about-footer">
            <h2>Get Started</h2>
            <p>
              Ready to explore? Start by browsing all countries or search for a specific destination.
              Add your favorites to keep track of places you want to visit!
            </p>
            <div className="about-buttons">
              <a href="/countries" className="about-button">
                Browse Countries
              </a>
              <a href="/favorites" className="about-button secondary">
                View Favorites
              </a>
            </div>
          </div>
        </section>

        <footer className="about-footer-info">
          <p>&copy; 2024 Travel Explorer. Built with ❤️ using React.</p>
        </footer>
      </div>
    </div>
  );
}
