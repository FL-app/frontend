import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import RoutesPath from '../../constants/enums/routesPath';

const PrivateRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
	return isAuthenticated ? (
		children
	) : (
		<Navigate to={RoutesPath.login} replace />
	);
};

export default PrivateRoute;

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
