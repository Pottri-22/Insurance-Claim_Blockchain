import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import DashboardUser from './pages/DashboardUser';
import DashboardHospital from './pages/DashboardHospital';
import DashboardInsurance from './pages/DashboardInsurance';
import DashboardAdmin from './pages/DashboardAdmin';
import ClaimCreate from './pages/ClaimCreate';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route 
          path="/claims/new" 
          element={
            <ProtectedRoute requiredRole="user">
              <ClaimCreate />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/user" 
          element={
            <ProtectedRoute requiredRole="user">
              <DashboardUser />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/hospital" 
          element={
            <ProtectedRoute requiredRole="hospital">
              <DashboardHospital />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/insurance" 
          element={
            <ProtectedRoute requiredRole="insurance_company">
              <DashboardInsurance />
            </ProtectedRoute>
          } 
        />
        <Route 
          path="/dashboard/admin" 
          element={
            <ProtectedRoute requiredRole="admin">
              <DashboardAdmin />
            </ProtectedRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;