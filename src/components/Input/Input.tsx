import React from 'react';
import './Input.scss';
import InputTypes from '../../constants/enums/inputTypes';

interface InputProps {
	label: string;
	type?: InputTypes;
	id: string;
	name: string;
	className: string;
	isRequired?: boolean;
	inputValue: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	placeholder: string;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	inputDirty?: boolean;
	inputError?: string;
}

function Input(props: InputProps) {
	const {
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
	} = props;
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

export default Input;
