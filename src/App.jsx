import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer'; 
import ProductDetails from './pages/ProjectDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Cart from './pages/Cart';

import Delivery from './pages/Delivery';
import Orders from './pages/Order';
import Track from './pages/TrackOrder';
import Product from './pages/Supplier/Product';
import Profile from './pages/Profile';
import RegisterProducts from './pages/Supplier/RegisterProducts';




function AppContent() {
  const { pathname } = useLocation();
  const hideLayout = pathname === '/login' || pathname === '/signup';

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/cart" element={<Cart />} />

        <Route path="/confirmation" element={<Delivery />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/track" element={<Track />} />
        <Route path="/productlist" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/add-product" element={<RegisterProducts/>} />
       

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
