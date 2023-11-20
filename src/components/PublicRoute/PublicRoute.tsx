import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';
import RoutesPath from '../../constants/enums/routesPath';

interface PublicRouteProps {
	children: ReactElement | ReactElement[];
}

const PublicRoute = (props: PublicRouteProps) => {
	const { children } = props;
	const isAuthenticated = useSelector(
		(state: RootState) => state.user.isAuthenticated
	);

	return isAuthenticated ? <Navigate to={RoutesPath.map} replace /> : children;
};

export default PublicRoute;
