// App.jsx
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
import PrivateRoute from './components/PrivateRoute';
import RoleBasedRoute from './components/RoleBasedRoute';

function AppContent() {
  const { pathname } = useLocation();
  const hideLayout = pathname === '/' || pathname === '/signup';

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Vendor-only pages */}
        <Route
          path="/home"
          element={
            <RoleBasedRoute allowedRole="vendor">
              <Home />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <RoleBasedRoute allowedRole="vendor">
              <Cart />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/confirmation"
          element={
            <RoleBasedRoute allowedRole="vendor">
              <Delivery />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <RoleBasedRoute allowedRole="vendor">
              <Orders />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/track"
          element={
            <RoleBasedRoute allowedRole="vendor">
              <Track />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <RoleBasedRoute allowedRole="vendor">
              <ProductDetails />
            </RoleBasedRoute>
          }
        />

        {/* Supplier-only pages */}
       
        <Route
          path="/productlist"
          element={
            <RoleBasedRoute allowedRole="supplier">
              <Product />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/add-product"
          element={
            <RoleBasedRoute allowedRole="supplier">
              <RegisterProducts />
            </RoleBasedRoute>
          }
        />

        {/* Common */}
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <Profile />
            </PrivateRoute>
          }
        />
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
