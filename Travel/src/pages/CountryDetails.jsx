import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCountryByCode } from '../services/api';
import { FavoriteContext } from '../context/FavoriteContext';

export default function CountryDetails() {
  const { code } = useParams();
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { favorites, addFavorite, removeFavorite } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const loadCountry = async () => {
      try {
        setLoading(true);
        const data = await fetchCountryByCode(code);
        setCountry(Array.isArray(data) ? data[0] : data);
      } catch (err) {
        setError(`Failed to load country details for ${code}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadCountry();
  }, [code]);

  useEffect(() => {
    if (country) {
      const inFavorites = favorites.some(fav => fav.cca2 === country.cca2);
      setIsFavorite(inFavorites);
    }
  }, [country, favorites]);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFavorite(country.cca2);
    } else {
      addFavorite(country);
    }
    setIsFavorite(!isFavorite);
  };

  if (loading) {
    return <div className="loading">Loading country details...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => navigate('/countries')}>Back to Countries</button>
      </div>
    );
  }

  if (!country) {
    return <div className="error-message">Country not found</div>;
  }

  const countryName = country.name?.common || 'Unknown';
  const flagEmoji = country.flag || '🏳️';
  const languages = country.languages
    ? Object.values(country.languages).join(', ')
    : 'N/A';
  const currencies = country.currencies
    ? Object.entries(country.currencies)
        .map(([code, curr]) => `${curr.name} (${code})`)
        .join(', ')
    : 'N/A';

  return (
    <div className="country-details">
      <button className="back-button" onClick={() => navigate('/countries')}>
        ← Back to Countries
      </button>

      <div className="details-container">
        <div className="flag-section">
          <div className="large-flag">{flagEmoji}</div>
          <h1>{countryName}</h1>
        </div>

        <div className="info-section">
          <div className="info-card">
            <h3>Basic Information</h3>
            <div className="info-row">
              <span className="info-label">Official Name:</span>
              <span className="info-value">{country.name?.official || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Region:</span>
              <span className="info-value">{country.region || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Subregion:</span>
              <span className="info-value">{country.subregion || 'N/A'}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Capital:</span>
              <span className="info-value">{country.capital?.[0] || 'N/A'}</span>
            </div>
          </div>

          <div className="info-card">
            <h3>Demographics</h3>
            <div className="info-row">
              <span className="info-label">Population:</span>
              <span className="info-value">
                {country.population?.toLocaleString() || 'N/A'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Area:</span>
              <span className="info-value">
                {country.area?.toLocaleString()} km²
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Landlocked:</span>
              <span className="info-value">
                {country.landlocked ? 'Yes' : 'No'}
              </span>
            </div>
          </div>

          <div className="info-card">
            <h3>Languages & Currency</h3>
            <div className="info-row">
              <span className="info-label">Languages:</span>
              <span className="info-value">{languages}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Currency:</span>
              <span className="info-value">{currencies}</span>
            </div>
            <div className="info-row">
              <span className="info-label">Timezones:</span>
              <span className="info-value">
                {country.timezones?.join(', ') || 'N/A'}
              </span>
            </div>
          </div>

          <div className="info-card">
            <h3>Borders & Connections</h3>
            <div className="info-row">
              <span className="info-label">Bordering Countries:</span>
              <span className="info-value">
                {country.borders?.length > 0 ? country.borders.join(', ') : 'None'}
              </span>
            </div>
            <div className="info-row">
              <span className="info-label">Continent:</span>
              <span className="info-value">
                {country.continents?.join(', ') || 'N/A'}
              </span>
            </div>
          </div>
        </div>

        <button
          className={`favorite-button ${isFavorite ? 'active' : ''}`}
          onClick={handleFavoriteClick}
        >
          {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>
    </div>
  );
}
