import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteContext } from '../context/FavoriteContext';

export default function CountryCard({ country }) {
  const { favorites, addFavorite, removeFavorite } = useContext(FavoriteContext);
  const [isFavorite, setIsFavorite] = useState(
    favorites.some(fav => fav.cca2 === country.cca2)
  );

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    if (isFavorite) {
      removeFavorite(country.cca2);
    } else {
      addFavorite(country);
    }
    setIsFavorite(!isFavorite);
  };

  const countryName = country.name?.common || 'Unknown';
  const flagEmoji = country.flag || '🏳️';

  return (
    <div className="country-card">
      <Link to={`/country/${country.cca2}`} className="card-link">
        <div className="card-flag">{flagEmoji}</div>
        <h3>{countryName}</h3>
        <p className="card-region">{country.region || 'N/A'}</p>
        <p className="card-capital">Capital: {country.capital?.[0] || 'N/A'}</p>
      </Link>
      <button
        className={`favorite-btn ${isFavorite ? 'active' : ''}`}
        onClick={handleFavoriteClick}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}
