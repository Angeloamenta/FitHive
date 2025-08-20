import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { token } = useAuth();

  if (!token) {
    // Se non sei loggato, reindirizza al login
    return <Navigate to="/login" replace />;
  }

  // Altrimenti mostra il contenuto
  return children;
};

export default PrivateRoute;
