import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FavoriteContext } from '../context/FavoriteContext';
import CountryCard from '../components/CountryCard';

export default function Favorites() {
  const { favorites } = useContext(FavoriteContext);
  const navigate = useNavigate();

  return (
    <div className="favorites-page">
      <h1>❤️ Your Favorite Countries</h1>

      {favorites && favorites.length > 0 ? (
        <>
          <div className="favorites-info">
            <p>You have {favorites.length} favorite country/countries saved</p>
          </div>

          <div className="countries-grid">
            {favorites.map(country => (
              <CountryCard key={country.cca2} country={country} />
            ))}
          </div>
        </>
      ) : (
        <div className="no-favorites">
          <div className="empty-state">
            <p className="empty-icon">🤍</p>
            <h2>No Favorites Yet</h2>
            <p>Start exploring countries and add them to your favorites!</p>
            <button
              className="explore-button"
              onClick={() => navigate('/countries')}
            >
              Explore Countries
            </button>
          </div>
        </div>
      )}

      {favorites && favorites.length > 0 && (
        <div className="favorites-stats">
          <h2>Favorite Countries Summary</h2>
          <div className="stats-list">
            {favorites.map(country => (
              <div key={country.cca2} className="stat-item">
                <span className="flag">{country.flag}</span>
                <span className="name">{country.name?.common}</span>
                <span className="region">{country.region}</span>
                <span className="population">
                  {country.population?.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
