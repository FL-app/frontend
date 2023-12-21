import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RoutesPath from '../../constants/enums/routesPath';
import { RootState } from '../../store';

interface PrivateRouteProps {
  children: ReactElement | ReactElement[];
}

function PrivateRoute(props: PrivateRouteProps) {
  const { children } = props;
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );
  return isAuthenticated ? (
    children
  ) : (
    <Navigate to={RoutesPath.login} replace />
  );
}

export default PrivateRoute;
