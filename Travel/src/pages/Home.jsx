import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';
import { fetchAllCountries } from '../services/api';

export default function Home() {
  const [countries, setCountries] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        // Get first 6 countries as featured
        setFeatured(data.slice(0, 6));
      } catch (err) {
        setError('Failed to load countries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim()) {
      navigate(`/countries?search=${searchTerm}`);
    }
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Travel Explorer</h1>
          <p>Discover countries around the world, explore cultures, and find your next adventure</p>
          <SearchBar onSearch={handleSearch} placeholder="Search for a country..." />
        </div>
      </section>

      {/* Featured Countries Section */}
      <section className="featured-section">
        <h2>Featured Countries</h2>
        {loading ? (
          <div className="loading">Loading countries...</div>
        ) : (
          <div className="countries-grid">
            {featured.map(country => (
              <CountryCard key={country.cca2} country={country} />
            ))}
          </div>
        )}
      </section>

      {/* Popular Destinations */}
      <section className="popular-section">
        <h2>Popular Destinations</h2>
        <div className="destinations-grid">
          <div className="destination-card">
            <h3>🇮🇳 India</h3>
            <p>Diverse culture, history, and spirituality</p>
          </div>
          <div className="destination-card">
            <h3>🇯🇵 Japan</h3>
            <p>Modern technology meets ancient traditions</p>
          </div>
          <div className="destination-card">
            <h3>🇫🇷 France</h3>
            <p>Art, romance, and world-class cuisine</p>
          </div>
          <div className="destination-card">
            <h3>🇦🇺 Australia</h3>
            <p>Adventure and stunning natural beauty</p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <h2>Ready to Explore?</h2>
        <p>Browse all countries and add your favorites</p>
        <button 
          className="cta-button"
          onClick={() => navigate('/countries')}
        >
          Browse All Countries
        </button>
      </section>
    </div>
  );
}
