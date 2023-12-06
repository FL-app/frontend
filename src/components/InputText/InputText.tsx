import './InputText.scss';
import InputTypes from '../../constants/enums/inputTypes';

interface InputTextProps {
	label: string;
	type?: InputTypes;
	id: string;
	name: string;
	isRequired?: boolean;
	inputValue: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
	inputDirty: boolean;
	inputError: string;
}

function InputText(props: InputTextProps) {
	const {
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
	} = props;
	return (
		<div className="registration_form_input-container">
			<label htmlFor={id} className="registration_form_label">
				{label}
				<input
					type={type ?? InputTypes.text}
					className={`registration_form_input ${
						inputDirty && inputError && 'registration_form_input_error'
					}`}
					id={id}
					name={name}
					required={isRequired ?? false}
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

export default InputText;
