// App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProjectDetails from './pages/ProjectDetails';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
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

import PrivateRoute from './components/PrivateRoute';
import RoleBasedRoute from './components/RoleBasedRoute';

function AppContent() {
  const { pathname } = useLocation();
  const hideLayout = pathname === '/' || pathname === '/signup';

  return (
    <>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public Routes */}
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
          path="/delivery"
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
              <Order />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/track-order"
          element={
            <RoleBasedRoute allowedRole="vendor">
              <TrackOrder />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/product/:id"
          element={
            <RoleBasedRoute allowedRole="vendor">
              <ProjectDetails />
            </RoleBasedRoute>
          }
        />
         <Route
          path="/mandi-chart"
          element={
            <RoleBasedRoute allowedRole="vendor">
              <MandiChart />
            </RoleBasedRoute>
          }
        />


        {/* Supplier-only pages */}
        <Route
          path="/supplier/dashboard"
          element={
            <RoleBasedRoute allowedRole="supplier">
              <SDashboard />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/supplier/inventory"
          element={
            <RoleBasedRoute allowedRole="supplier">
              <SInventry />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/supplier/new-product"
          element={
            <RoleBasedRoute allowedRole="supplier">
              <SNewProduct />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/supplier/orders"
          element={
            <RoleBasedRoute allowedRole="supplier">
              <SOrder />
            </RoleBasedRoute>
          }
        />
        <Route
          path="/supplier/profile"
          element={
            <RoleBasedRoute allowedRole="supplier">
              <SProfile />
            </RoleBasedRoute>
          }
        />

        {/* Common Protected Routes */}
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