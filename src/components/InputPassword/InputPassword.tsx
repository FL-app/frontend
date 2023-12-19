import './InputPassword.scss';
import React from 'react';
import InputTypes from '../../constants/enums/inputTypes';

interface InputPasswordProps {
	label: string;
	passwordType: InputTypes;
	id: string;
	name: string;
	isRequired?: boolean;
	inputValue: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	passwordDirty: boolean;
	passwordError: string;
	onPasswordBtnClick?: () => void;
	placeholder: string;
}

function InputPassword(props: InputPasswordProps) {
	const {
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
		placeholder,
	} = props;
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
					autoComplete="on"
					placeholder={placeholder}
				/>
				<button
					type="button"
					aria-label="show/hide button click"
					className={`registration_form_password-control ${
						passwordType === InputTypes.text &&
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

export default InputPassword;
