import './InputText.scss';
import PropTypes from 'prop-types';

export default function InputText({
	label,
	type,
	id,
	name,
	isRequired,
	inputValue,
	onChange,
	onBlur,
	inputDirty,
	inputError,
}) {
	return (
		<div className="registration_form_input-container">
			<label htmlFor={id} className="registration_form_label">
				{label}
				<input
					type={type}
					className={`registration_form_input ${
						inputDirty && inputError && 'registration_form_input_error'
					}`}
					id={id}
					name={name}
					required={isRequired}
					value={inputValue}
					onChange={onChange}
					onBlur={onBlur}
				/>
			</label>
			{inputDirty && inputError && (
				<span className="registration_form_input_error-text">{inputError}</span>
			)}
		</div>
	);
}

InputText.propTypes = {
	label: PropTypes.string.isRequired,
	type: PropTypes.oneOf(['text', 'email']),
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	isRequired: PropTypes.bool,
	inputValue: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	inputDirty: PropTypes.bool.isRequired,
	inputError: PropTypes.string.isRequired,
};

InputText.defaultProps = {
	type: 'text',
	isRequired: false,
	onChange: undefined,
	onBlur: undefined,
};
