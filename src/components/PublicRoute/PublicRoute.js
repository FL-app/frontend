import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
	const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

	return !isAuthenticated ? children : <Navigate to="/map" replace />;
};

export default PublicRoute;

PublicRoute.propTypes = {
	children: PropTypes.node.isRequired,
};
