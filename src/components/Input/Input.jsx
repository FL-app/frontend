import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

export default function Input({
	label,
	type,
	id,
	name,
	className,
	isRequired,
	inputValue,
	onChange,
	placeholder,
	onBlur,
	inputDirty,
	inputError,
}) {
	return (
		<div className="form-input-container">
			<label htmlFor={id} className="form-input-label">
				{label}
				<input
					type={type}
					className={`form-input ${className} ${
						inputDirty && inputError && `form_input_error`
					}`}
					id={id}
					name={name}
					placeholder={placeholder}
					required={isRequired}
					value={inputValue}
					onChange={onChange}
					onBlur={onBlur}
				/>
			</label>
			{inputDirty && inputError && (
				<span className="form-input-error-text">{inputError}</span>
			)}
		</div>
	);
}

Input.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'email']),
	id: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	name: PropTypes.string.isRequired,
	className: PropTypes.string.isRequired,
	isRequired: PropTypes.bool,
	inputValue: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	inputDirty: PropTypes.bool,
	inputError: PropTypes.string,
};

Input.defaultProps = {
	type: 'text',
	placeholder: '',
	inputDirty: true,
	isRequired: false,
	onChange: undefined,
	onBlur: undefined,
	inputError: '',
};
