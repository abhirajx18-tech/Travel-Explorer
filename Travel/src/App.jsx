import { BrowserRouter as Router } from 'react-router-dom';
import { FavoriteProvider } from './context/FavoriteContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  return (
    <Router>
      <ThemeProvider>
        <FavoriteProvider>
          <AppRoutes />
        </FavoriteProvider>
      </ThemeProvider>
    </Router>
  );
}

export default App;
