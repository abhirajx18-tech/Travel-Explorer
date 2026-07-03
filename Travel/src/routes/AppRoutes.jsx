import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Countries from '../pages/Countries';
import CountryDetails from '../pages/CountryDetails';
import Favorites from '../pages/Favorites';
import UserProfile from '../pages/UserProfile';
import About from '../pages/About';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function AppRoutes() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/countries" element={<Countries />} />
        <Route path="/country/:code" element={<CountryDetails />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
}
