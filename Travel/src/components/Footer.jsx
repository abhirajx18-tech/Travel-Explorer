export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Travel Explorer</h3>
          <p>Explore the world, one country at a time.</p>
        </div>

        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/countries">Countries</a></li>
            <li><a href="/favorites">Favorites</a></li>
            <li><a href="/about">About</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Resources</h4>
          <ul>
            <li><a href="https://restcountries.com" target="_blank" rel="noopener noreferrer">REST Countries API</a></li>
            <li><a href="https://dummyjson.com" target="_blank" rel="noopener noreferrer">DummyJSON API</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <p>
            <a href="#twitter">Twitter</a> | 
            <a href="#facebook">Facebook</a> | 
            <a href="#instagram">Instagram</a>
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2024 Travel Explorer. All rights reserved.</p>
      </div>
    </footer>
  );
}
