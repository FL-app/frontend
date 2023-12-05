import './Registration.scss';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button, InputText, InputPassword } from '../../components';
import avatarMan from '../../images/avatarman.png';
import avatarWoman from '../../images/avatarwoman.png';
import registerUser from '../../store/thunk/registerUser';
import RoutesPath from '../../constants/enums/routesPath';
import ValidationErrorMessages from '../../constants/enums/validation';
import {
	emailPattern,
	namePattern,
	nicknamePattern,
} from '../../constants/regExp/validation';
import { AppDispatch, RootState } from '../../store';

const Registration = () => {
	const navigate = useNavigate();
	const [userData, setUserData] = useState({
		name: '',
		surname: '',
		nickname: '',
		sex: 'female',
		email: '',
		password: '',
		confirmPassword: '',
		termsOfUse: false,
	});
	const [nameDirty, setNameDirty] = useState(false);
	const [surnameDirty, setSurnameDirty] = useState(false);
	const [nicknameDirty, setNicknameDirty] = useState(false);
	const [emailDirty, setEmailDirty] = useState(false);
	const [passwordDirty, setPasswordDirty] = useState(false);
	const [confirmPasswordDirty, setConfirmPasswordDirty] = useState(false);
	const [termsOfUse, setTermsOfUse] = useState(false);
	const [maleChecked, setMaleChecked] = useState(false);
	const [femaleChecked, setFemaleChecked] = useState(true);
	const [nameError, setNameError] = useState(
		ValidationErrorMessages.emptyNameErrorText
	);
	const [surnameError, setSurnameError] = useState(
		ValidationErrorMessages.emptySurnameErrorText
	);
	const [nicknameError, setNicknameError] = useState(
		ValidationErrorMessages.emptyNicknameErrorText
	);
	const [emailError, setEmailError] = useState(
		ValidationErrorMessages.emptyEmailErrorText
	);
	const [passwordError, setPasswordError] = useState(
		ValidationErrorMessages.emptyPasswordErrorText
	);
	const [confirmPasswordError, setConfirmPasswordError] = useState(
		ValidationErrorMessages.invalidConfirmPasswordErrorText
	);
	const [checkboxError, setCheckboxError] = useState(false);
	const [step, setStep] = useState(1);
	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = evt.target;

		setUserData({
			...userData,
			[name]: value,
		});

		switch (name) {
			case 'name':
				if (String(value).length === 0) {
					setNameError(ValidationErrorMessages.emptyNameErrorText);
				} else if (!value.match(namePattern)) {
					setNameError(ValidationErrorMessages.invalidNameErrorText);
				} else {
					setNameError(ValidationErrorMessages.emptyString);
				}
				break;
			case 'surname':
				if (String(value).length === 0) {
					setSurnameError(ValidationErrorMessages.emptySurnameErrorText);
				} else if (!value.match(namePattern)) {
					setSurnameError(ValidationErrorMessages.invalidSurnameErrorText);
				} else {
					setSurnameError(ValidationErrorMessages.emptyString);
				}
				break;
			case 'nickname':
				if (String(value).length === 0) {
					setNicknameError(ValidationErrorMessages.emptyNicknameErrorText);
				} else if (!value.match(nicknamePattern)) {
					setNicknameError(ValidationErrorMessages.invalidNicknameErrorText);
				} else {
					setNicknameError(ValidationErrorMessages.emptyString);
				}
				break;
			case 'email':
				if (String(value).length === 0) {
					setEmailError(ValidationErrorMessages.emptyEmailErrorText);
				} else if (!value.match(emailPattern)) {
					setEmailError(ValidationErrorMessages.invalidEmailErrorText);
				} else {
					setEmailError(ValidationErrorMessages.emptyString);
				}
				break;
			case 'password':
				if (String(value).length === 0) {
					setPasswordError(ValidationErrorMessages.emptyPasswordErrorText);
				} else {
					setPasswordError(ValidationErrorMessages.emptyString);
				}

				if (value !== userData.confirmPassword && confirmPasswordDirty) {
					setConfirmPasswordError(
						ValidationErrorMessages.invalidConfirmPasswordErrorText
					);
				} else {
					setConfirmPasswordError(ValidationErrorMessages.emptyString);
				}
				break;
			case 'confirmPassword':
				if (String(value).length === 0) {
					setConfirmPasswordError(
						ValidationErrorMessages.emptyPasswordErrorText
					);
				} else if (value !== userData.password) {
					setConfirmPasswordError(
						ValidationErrorMessages.invalidConfirmPasswordErrorText
					);
				} else {
					setConfirmPasswordError(ValidationErrorMessages.emptyString);
				}
				break;
			case 'sex':
				setMaleChecked(!maleChecked);
				setFemaleChecked(!femaleChecked);
				break;
			default:
				break;
		}
	};

	const blurHandler = (evt: React.FocusEvent<HTMLInputElement>) => {
		switch (evt.target.name) {
			case 'name':
				setNameDirty(true);
				break;
			case 'surname':
				setSurnameDirty(true);
				break;
			case 'nickname':
				setNicknameDirty(true);
				break;
			case 'email':
				setEmailDirty(true);
				break;
			case 'password':
				setPasswordDirty(true);
				break;
			case 'confirmPassword':
				setConfirmPasswordDirty(true);
				break;
			default:
				break;
		}
	};

	const handleContinueButtonClick = () => {
		if (!nameError && !surnameError && !nicknameError && !emailError) {
			setStep(2);
		} else if (userData.name.length === 0) {
			setNameDirty(true);
			setNameError(ValidationErrorMessages.emptyNameErrorText);
		} else if (userData.surname.length === 0) {
			setSurnameDirty(true);
			setSurnameError(ValidationErrorMessages.emptySurnameErrorText);
		} else if (userData.nickname.length === 0) {
			setNicknameDirty(true);
			setNicknameError(ValidationErrorMessages.emptyNicknameErrorText);
		} else if (userData.email.length === 0) {
			setEmailDirty(true);
			setEmailError(ValidationErrorMessages.emptyEmailErrorText);
		}
	};

	const [passwordType, setPasswordType] = useState('password');
	const [confirmPasswordType, setConfirmPasswordType] = useState('password');

	const handlePasswordBtnClick = () => {
		if (passwordType === 'password') {
			setPasswordType('text');
		} else {
			setPasswordType('password');
		}
	};
	const handleConfirmPasswordBtnClick = () => {
		if (confirmPasswordType === 'password') {
			setConfirmPasswordType('text');
		} else {
			setConfirmPasswordType('password');
		}
	};

	const handleBtnBackClick = () => {
		if (step === 2) {
			setStep(1);
		} else {
			navigate(-1);
		}
	};

	const formValidCheck = (validationStep: number) => {
		const isFormValidStepOne =
			!nameError && !surnameError && !nicknameError && !emailError;
		const isFormValidStepTwo =
			isFormValidStepOne &&
			!passwordError &&
			!confirmPasswordError &&
			termsOfUse;

		if (validationStep === 1) {
			return isFormValidStepOne;
		}

		return isFormValidStepTwo;
	};

	const dispatch = useDispatch<AppDispatch>();
	const { errorMessage, registerSuccess, requestCounter } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		if (registerSuccess) navigate(RoutesPath.accessGeo);
		if (!registerSuccess && errorMessage) {
			const errors = JSON.parse(errorMessage) as {
				email: ValidationErrorMessages[];
				username: ValidationErrorMessages[];
				firstname: ValidationErrorMessages[];
				lastname: ValidationErrorMessages[];
				password: ValidationErrorMessages[];
			};
			setEmailError(ValidationErrorMessages.emptyString);
			setNicknameError(ValidationErrorMessages.emptyString);
			setNameError(ValidationErrorMessages.emptyString);
			setSurnameError(ValidationErrorMessages.emptyString);
			setPasswordError(ValidationErrorMessages.emptyString);

			if (errors.email) {
				setStep(1);
				setEmailError(errors.email[0]);
			}
			if (errors.username) {
				setStep(1);
				setNicknameError(errors.username[0]);
			}
			if (errors.firstname) {
				setStep(1);
				setNameError(errors.firstname[0]);
			}
			if (errors.lastname) {
				setStep(1);
				setSurnameError(errors.lastname[0]);
			}
			if (errors.password) {
				setPasswordError(errors.password[0]);
			}
		}
	}, [navigate, errorMessage, registerSuccess, requestCounter]);

	const handleSubmit = () => {
		if (formValidCheck(2)) {
			dispatch(registerUser(userData));
		}
		setPasswordDirty(true);
		setConfirmPasswordDirty(true);
		setCheckboxError(true);
	};

	return (
		<section className="registration">
			<div
				className={`registration_container ${
					step === 2 && 'registration_container_step-2'
				}`}
			>
				<button
					type="button"
					className="registration_btn-back"
					onClick={handleBtnBackClick}
					aria-label="Back"
				/>
				{step === 1 ? (
					<>
						<div className="registration_vector" />
						<form className="registration_form">
							<h2 className="registration_form_step-number">Шаг 1 из 2</h2>
							<h1 className="registration_form_title">Создаём аккаунт</h1>
							<InputText
								label="Имя"
								id="name"
								name="name"
								isRequired
								inputValue={userData.name}
								onChange={handleChange}
								onBlur={blurHandler}
								inputDirty={nameDirty}
								inputError={nameError}
							/>
							<InputText
								label="Фамилия"
								id="surname"
								name="surname"
								isRequired
								inputValue={userData.surname}
								onChange={handleChange}
								onBlur={blurHandler}
								inputDirty={surnameDirty}
								inputError={surnameError}
							/>
							<InputText
								label="Твой ник"
								id="nickname"
								name="nickname"
								isRequired
								inputValue={userData.nickname}
								onChange={handleChange}
								onBlur={blurHandler}
								inputDirty={nicknameDirty}
								inputError={nicknameError}
							/>
							<InputText
								label="Email"
								id="email"
								name="email"
								isRequired
								inputValue={userData.email}
								onChange={handleChange}
								onBlur={blurHandler}
								inputDirty={emailDirty}
								inputError={emailError}
							/>
							<fieldset className="registration_form_sex-fieldset">
								<legend className="registration_form_sex-fieldset_legend">
									Пол
								</legend>
								<div className="registration_form_sex-fieldset_radio-container">
									<input
										type="radio"
										id="female"
										name="sex"
										value="female"
										className="registration_form_sex-fieldset_radio"
										checked={femaleChecked}
										onChange={handleChange}
									/>
									<label
										htmlFor="female"
										className="registration_form_sex-fieldset_label"
									/>
									<img src={avatarWoman} alt="Avatar woman" />
								</div>
								<div className="registration_form_sex-fieldset_radio-container">
									<input
										type="radio"
										id="male"
										name="sex"
										value="male"
										className="registration_form_sex-fieldset_radio"
										checked={maleChecked}
										onChange={handleChange}
									/>
									<label
										htmlFor="male"
										className="registration_form_sex-fieldset_label"
									/>
									<img src={avatarMan} alt="Avatar man" />
								</div>
							</fieldset>
							<Button
								label="Продолжить"
								type="button"
								color="primary"
								size="large"
								className="registration_form_btn-continue"
								onClick={handleContinueButtonClick}
							/>

							<span className="registration_form_span">
								У тебя уже есть аккаунт?{' '}
								<Link to={RoutesPath.login} className="registration_form_link">
									Войти
								</Link>
							</span>
						</form>
					</>
				) : (
					<>
						<div className="registration_vector registration_vector_step-2" />
						<div className="registration_spiral" />
						<div className="registration_diamond" />
						<form className="registration_form">
							<h2 className="registration_form_step-number">Шаг 2 из 2</h2>
							<h1 className="registration_form_title">Создаём аккаунт</h1>
							<InputPassword
								label="Придумайте пароль"
								passwordType={passwordType}
								id="password"
								name="password"
								isRequired
								inputValue={userData.password}
								onChange={handleChange}
								onBlur={blurHandler}
								passwordDirty={passwordDirty}
								passwordError={passwordError}
								onPasswordBtnClick={handlePasswordBtnClick}
							/>
							<InputPassword
								label="Подтверждение пароля"
								passwordType={confirmPasswordType}
								id="confirmPassword"
								name="confirmPassword"
								isRequired
								inputValue={userData.confirmPassword}
								onChange={handleChange}
								onBlur={blurHandler}
								passwordDirty={confirmPasswordDirty}
								passwordError={confirmPasswordError}
								onPasswordBtnClick={handleConfirmPasswordBtnClick}
							/>
							<div className="registration_form_terms-of-use-container">
								<input
									id="terms-of-use-checkbox"
									type="checkbox"
									className={`registration_form_terms-of-use_checkbox ${
										checkboxError ? 'checkbox-error' : ''
									}`}
									value={String(termsOfUse)}
									onChange={() => {
										setTermsOfUse(!termsOfUse);
										setUserData({
											...userData,
											termsOfUse,
										});
									}}
									checked={termsOfUse}
								/>
								<label
									htmlFor="terms-of-use-checkbox"
									className="registration_form_terms-of-use_label"
								/>
								<span className="registration_form_terms-of-use-text">
									Регистрируясь, ты подтверждаешь,
									<br /> что прочитал(а) и принимаешь &nbsp;
									<Link
										to={RoutesPath.privacyPolicy}
										className="registration_form_terms-of-use-link"
										target="_blank"
									>
										политику конфиденциальности
									</Link>
									&nbsp;и&nbsp;
									<Link
										to={RoutesPath.termsOfUse}
										className="registration_form_terms-of-use-link"
										target="_blank"
									>
										условия использования
									</Link>
								</span>
							</div>
							<Button
								label="Зарегистрироваться"
								type="button"
								color="primary"
								size="large"
								className="registration_form_btn-continue"
								onClick={handleSubmit}
							/>

							<span className="registration_form_span">
								У тебя уже есть аккаунт?{' '}
								<Link to={RoutesPath.login} className="registration_form_link">
									Войти
								</Link>
							</span>
						</form>
					</>
				)}
			</div>
		</section>
	);
};

export default Registration;