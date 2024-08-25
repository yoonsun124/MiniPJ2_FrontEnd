import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProtectedRoute = ({ element: Component }) => {
  const isAuthenticated = Boolean(localStorage.getItem('token')); // 인증 여부 확인

  return isAuthenticated ? <Component /> : <Navigate to="/login" replace />;
};

// PropTypes 설정
ProtectedRoute.propTypes = {
    element: PropTypes.elementType.isRequired,
  };

export default ProtectedRoute;
