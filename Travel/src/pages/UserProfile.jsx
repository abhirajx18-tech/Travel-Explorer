import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchUserById } from '../services/api';

export default function UserProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUser = async () => {
      try {
        setLoading(true);
        const data = await fetchUserById(id);
        setUser(data);
      } catch (err) {
        setError(`Failed to load user profile for ID ${id}`);
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [id]);

  if (loading) {
    return <div className="loading">Loading user profile...</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <p>{error}</p>
        <button onClick={() => navigate('/')}>Back to Home</button>
      </div>
    );
  }

  if (!user) {
    return <div className="error-message">User not found</div>;
  }

  return (
    <div className="user-profile">
      <button className="back-button" onClick={() => navigate('/')}>
        ← Back to Home
      </button>

      <div className="profile-container">
        <div className="profile-header">
          <div className="avatar">
            <img src={user.image} alt={user.firstName} />
          </div>
          <div className="profile-name">
            <h1>{user.firstName} {user.lastName}</h1>
            <p className="username">@{user.username}</p>
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <div className="profile-info">
              <div className="info-item">
                <label>Email:</label>
                <p>{user.email}</p>
              </div>
              <div className="info-item">
                <label>Phone:</label>
                <p>{user.phone}</p>
              </div>
              <div className="info-item">
                <label>Date of Birth:</label>
                <p>{user.birthDate}</p>
              </div>
              <div className="info-item">
                <label>Gender:</label>
                <p>{user.gender}</p>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Address Information</h2>
            <div className="profile-info">
              <div className="info-item">
                <label>Street:</label>
                <p>{user.address?.address || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>City:</label>
                <p>{user.address?.city || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>State:</label>
                <p>{user.address?.state || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>Country:</label>
                <p>{user.address?.country || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>Postal Code:</label>
                <p>{user.address?.postalCode || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Professional Information</h2>
            <div className="profile-info">
              <div className="info-item">
                <label>Company:</label>
                <p>{user.company?.name || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>Department:</label>
                <p>{user.company?.department || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>Title:</label>
                <p>{user.company?.title || 'N/A'}</p>
              </div>
            </div>
          </div>

          <div className="profile-section">
            <h2>Other Details</h2>
            <div className="profile-info">
              <div className="info-item">
                <label>Eye Color:</label>
                <p>{user.eyeColor}</p>
              </div>
              <div className="info-item">
                <label>Hair Color:</label>
                <p>{user.hair?.color || 'N/A'}</p>
              </div>
              <div className="info-item">
                <label>Weight:</label>
                <p>{user.weight} kg</p>
              </div>
              <div className="info-item">
                <label>Height:</label>
                <p>{user.height} cm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
