import { Routes, Route, Navigate } from "react-router-dom";
import Login from "../features/auth/Login";
import AdminDashboard from "../features/admin/AdminDashboard";
import DoctorDashboard from "../features/doctor/DoctorDashboard";
import PatientDashboard from "../features/patient/PatientDashboard";
import ProtectedRoute from "../components/protected/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Redirect root to login */}
      <Route path="/" element={<Navigate to="/login" />} />

      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/doctor"
        element={
          <ProtectedRoute role="doctor">
            <DoctorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/patient"
        element={
            <ProtectedRoute role="user">
            <PatientDashboard />
            </ProtectedRoute>
        }
        />

    </Routes>
  );
}
