import React from 'react';
import PropTypes from 'prop-types';
import './ButtonUserLocation.scss';

export default function ButtonUserLocation({ handleClick }) {
	const props = {
		handleClick,
	};

	return (
		<button
			className="buttonUserLocation"
			type="button"
			aria-label="Мое местоположение на карте"
			onClick={props.handleClick}
		/>
	);
}

ButtonUserLocation.propTypes = {
	handleClick: PropTypes.func,
};

ButtonUserLocation.defaultProps = {
	handleClick: undefined,
};
