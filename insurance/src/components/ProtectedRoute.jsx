import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  // Check if user is logged in (from localStorage)
  const userString = localStorage.getItem('blockclaim_user');
  const token = localStorage.getItem('blockclaim_token');

  if (!userString || !token) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }

  const user = JSON.parse(userString);

  // If a specific role is required, check it
  if (requiredRole && user.role !== requiredRole) {
    // Redirect to appropriate dashboard based on user's actual role
    switch (user.role) {
      case 'user':
        return <Navigate to="/dashboard/user" replace />;
      case 'hospital':
        return <Navigate to="/dashboard/hospital" replace />;
      case 'insurance_company':
        return <Navigate to="/dashboard/insurance" replace />;
      case 'admin':
        return <Navigate to="/dashboard/admin" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;