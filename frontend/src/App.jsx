// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectDetails from './pages/ProjectDetails';
import Home from './pages/Home';

import Cart from './pages/Cart';
import Delivery from './pages/Delivery';
import Order from './pages/Order';
import TrackOrder from './pages/TrackOrder';
import Profile from './pages/Profile';
import MandiChart from './pages/MandiChart';

// Supplier pages
import SDashboard from './pages/Supplier/SDashboard';
import SInventry from './pages/Supplier/SInventry';
import SNewProduct from './pages/Supplier/SNewProduct';
import SOrder from './pages/Supplier/SOrder';
import SProfile from './pages/Supplier/SProfile';

function AppContent() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* All pages now accessible directly */}
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/delivery" element={<Delivery />} />
        <Route path="/orders" element={<Order />} />
        <Route path="/track-order" element={<TrackOrder />} />
        <Route path="/product/:id" element={<ProjectDetails />} />
        <Route path="/mandi-chart" element={<MandiChart />} />
        <Route path="/profile" element={<Profile />} />

        {/* Supplier pages */}
        <Route path="/supplier/dashboard" element={<SDashboard />} />
        <Route path="/supplier/inventory" element={<SInventry />} />
        <Route path="/supplier/new-product" element={<SNewProduct />} />
        <Route path="/supplier/orders" element={<SOrder />} />
        <Route path="/supplier/profile" element={<SProfile />} />
      </Routes>

      <Footer />
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