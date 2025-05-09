import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext.jsx';

const SessionRedirector = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading || !user) return;

    // Prevent redirect loop
    const isAtRoot = location.pathname === '/';

    if (isAtRoot || location.pathname === '/login') {
      if (user.type === 'admin' || user.type === 'manager') {
        navigate('/dashboard', { replace: true });
      } else {
        navigate('/', { replace: true });
      }
    }
  }, [user, loading, location, navigate]);

  return null;
};

export default SessionRedirector;
