import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext.jsx';

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/" />;

  if (!allowedRoles.includes(user.type)) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default ProtectedRoute;
