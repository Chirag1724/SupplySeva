// components/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem("token"); // convert to boolean
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
