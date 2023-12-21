import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RoutesPath from '../../constants/enums/routesPath';
import { RootState } from '../../store';

interface PublicRouteProps {
  children: ReactElement | ReactElement[];
}

function PublicRoute(props: PublicRouteProps) {
  const { children } = props;
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated,
  );

  return isAuthenticated ? <Navigate to={RoutesPath.map} replace /> : children;
}

export default PublicRoute;
