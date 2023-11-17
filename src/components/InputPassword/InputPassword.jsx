import './InputPassword.scss';
import PropTypes from 'prop-types';

export default function InputPassword({
	label,
	passwordType,
	id,
	name,
	isRequired,
	inputValue,
	onChange,
	onBlur,
	passwordDirty,
	passwordError,
	onPasswordBtnClick,
}) {
	return (
		<div className="registration_form_input-container">
			<label htmlFor={id} className="registration_form_label">
				{label}
				<input
					type={passwordType}
					className={`registration_form_input ${
						passwordDirty && passwordError && 'registration_form_input_error'
					}`}
					id={id}
					name={name}
					required={isRequired}
					value={inputValue}
					onChange={onChange}
					onBlur={onBlur}
				/>
				<button
					type="button"
					aria-label="show/hide button click"
					className={`registration_form_password-control ${
						passwordType === 'text' &&
						'registration_form_password-control_active'
					}`}
					onClick={onPasswordBtnClick}
				/>
			</label>
			{passwordDirty && passwordError && (
				<span className="registration_form_input_error-text">
					{passwordError}
				</span>
			)}
		</div>
	);
}

InputPassword.propTypes = {
	label: PropTypes.string.isRequired,
	passwordType: PropTypes.oneOf(['password', 'text']).isRequired,
	id: PropTypes.string.isRequired,
	name: PropTypes.string.isRequired,
	isRequired: PropTypes.bool,
	inputValue: PropTypes.string.isRequired,
	onChange: PropTypes.func,
	onBlur: PropTypes.func,
	passwordDirty: PropTypes.bool.isRequired,
	passwordError: PropTypes.string.isRequired,
	onPasswordBtnClick: PropTypes.func,
};

InputPassword.defaultProps = {
	isRequired: false,
	onChange: undefined,
	onBlur: undefined,
	onPasswordBtnClick: undefined,
};
