import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import ProductDetails from './pages/ProjectDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';
import Deliver from './pages/Deliver';

function AppContent() {
  const { pathname } = useLocation();
  const hideLayout = pathname === '/login' || pathname === '/signup';

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/delivery" element={<Deliver/>} />

      </Routes>

      {!hideLayout && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
