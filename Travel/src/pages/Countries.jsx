import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CountryCard from '../components/CountryCard';
import { fetchAllCountries } from '../services/api';

export default function Countries() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [searchParams] = useSearchParams();

  const regions = [
    'all',
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
  ];

  useEffect(() => {
    const loadCountries = async () => {
      try {
        setLoading(true);
        const data = await fetchAllCountries();
        setCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        setError('Failed to load countries');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCountries();
  }, []);

  useEffect(() => {
    const searchTerm = searchParams.get('search') || '';
    filterCountries(searchTerm, selectedRegion);
  }, [searchParams, selectedRegion, countries]);

  const filterCountries = (searchTerm, region) => {
    let result = countries;

    // Filter by search term
    if (searchTerm) {
      result = result.filter(country =>
        country.name?.common?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by region
    if (region !== 'all') {
      result = result.filter(country => country.region === region);
    }

    setFilteredCountries(result);
  };

  const handleSearch = (searchTerm) => {
    filterCountries(searchTerm, selectedRegion);
  };

  const handleRegionChange = (e) => {
    const region = e.target.value;
    setSelectedRegion(region);
    filterCountries(searchParams.get('search') || '', region);
  };

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="countries-page">
      <h1>Countries of the World</h1>

      <div className="countries-controls">
        <SearchBar 
          onSearch={handleSearch} 
          placeholder="Search countries..." 
        />

        <div className="filter-section">
          <label htmlFor="region-filter">Filter by Region:</label>
          <select
            id="region-filter"
            value={selectedRegion}
            onChange={handleRegionChange}
            className="region-filter"
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region === 'all' ? 'All Regions' : region}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="results-info">
        <p>Showing {filteredCountries.length} countries</p>
      </div>

      {loading ? (
        <div className="loading">Loading countries...</div>
      ) : filteredCountries.length > 0 ? (
        <div className="countries-grid">
          {filteredCountries.map(country => (
            <CountryCard key={country.cca2} country={country} />
          ))}
        </div>
      ) : (
        <div className="no-results">
          <p>No countries found. Try adjusting your search or filter.</p>
        </div>
      )}
    </div>
  );
}
