import React, { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { RootState } from '../../store';

interface PublicRouteProps {
	children: ReactElement | ReactElement[];
}

const PublicRoute = (props: PublicRouteProps) => {
	const { children } = props;
	const isAuthenticated = useSelector(
		(state: RootState) => state.user.isAuthenticated
	);

	return isAuthenticated ? <Navigate to="/map" replace /> : children;
};

export default PublicRoute;
