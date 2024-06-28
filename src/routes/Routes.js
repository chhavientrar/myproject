// routes/Routes.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import SignUp from '../components/signup';
import Login from '../components/login';
import Dashboard from '../components/dashboard';
import ProtectedRoute from '../components/protectedRoutes/ProtectedRoute';
// import ProtectedRoute from '../components/ProtectedRoute';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ProtectedRoute element={Dashboard} />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
