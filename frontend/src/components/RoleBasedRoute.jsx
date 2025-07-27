// components/RoleBasedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';

const RoleBasedRoute = ({ children, allowedRole }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user'));

  if (!token || !user) return <Navigate to="/" />;

  return user.role === allowedRole ? children : <Navigate to="/" />;
};

export default RoleBasedRoute;
