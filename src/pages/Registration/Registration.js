/* eslint-disable jsx-a11y/label-has-associated-control */
import './Registration.scss';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
	namePattern,
	emailPattern,
	emptyNameErrorText,
	emptySurnameErrorText,
	emptyNicknameErrorText,
	emptyEmailErrorText,
	emptyPasswordErrorText,
	invalidNameErrorText,
	invalidSurnameErrorText,
	invalidNicknameErrorText,
	invalidEmailErrorText,
	invalidConfirmPasswordErrorText,
	ROUTES,
} from '../../constants';

import { Button, InputText, InputPassword } from '../../components';

import avatarman from '../../images/avatarman.png';
import avatarwoman from '../../images/avatarwoman.png';

export const Registration = () => {
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

	const [nameError, setNameError] = useState(emptyNameErrorText);
	const [surnameError, setSurnameError] = useState(emptySurnameErrorText);
	const [nicknameError, setNicknameError] = useState(emptyNicknameErrorText);
	const [emailError, setEmailError] = useState(emptyEmailErrorText);
	const [passwordError, setPasswordError] = useState(emptyPasswordErrorText);
	const [confirmPasswordError, setConfirmPasswordError] = useState(
		invalidConfirmPasswordErrorText
	);

	const [step, setStep] = useState(1);

	const handleChange = (evt) => {
		const { name, value } = evt.target;

		setUserData({
			...userData,
			[name]: value,
		});

		switch (name) {
			case 'name':
				if (String(value).length === 0) {
					setNameError(emptyNameErrorText);
				} else if (!value.match(namePattern)) {
					setNameError(invalidNameErrorText);
				} else {
					setNameError('');
				}
				break;
			case 'surname':
				if (String(value).length === 0) {
					setSurnameError(emptySurnameErrorText);
				} else if (!value.match(namePattern)) {
					setSurnameError(invalidSurnameErrorText);
				} else {
					setSurnameError('');
				}
				break;
			case 'nickname':
				if (String(value).length === 0) {
					setNicknameError(emptyNicknameErrorText);
				} else if (!value.match(namePattern)) {
					setNicknameError(invalidNicknameErrorText);
				} else {
					setNicknameError('');
				}
				break;
			case 'email':
				if (String(value).length === 0) {
					setEmailError(emptyEmailErrorText);
				} else if (!value.match(emailPattern)) {
					setEmailError(invalidEmailErrorText);
				} else {
					setEmailError('');
				}
				break;
			case 'password':
				if (String(value).length === 0) {
					setPasswordError(emptyPasswordErrorText);
				} else {
					setPasswordError('');
				}

				if (value !== userData.confirmPassword && confirmPasswordDirty) {
					setConfirmPasswordError(invalidConfirmPasswordErrorText);
				} else {
					setConfirmPasswordError('');
				}
				break;
			case 'confirmPassword':
				if (String(value).length === 0) {
					setConfirmPasswordError(emptyPasswordErrorText);
				} else if (value !== userData.password) {
					setConfirmPasswordError(invalidConfirmPasswordErrorText);
				} else {
					setConfirmPasswordError('');
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

	const blurHandler = (evt) => {
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
			setNameError(emptyNameErrorText);
		} else if (userData.surname.length === 0) {
			setSurnameDirty(true);
			setSurnameError(emptySurnameErrorText);
		} else if (userData.nickname.length === 0) {
			setNicknameDirty(true);
			setNicknameError(emptyNicknameErrorText);
		} else if (userData.email.length === 0) {
			setEmailDirty(true);
			setEmailError(emptyEmailErrorText);
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

	const hadleBtnBackClick = () => {
		if (step === 2) {
			setStep(1);
		} else {
			navigate(-1);
		}
	};

	// const formValidCheck = (validationStep) => {
	// 	const isFormValidStepOne = !nameError && !surnameError && !nicknameError && !emailError;
	// 	const isFormValidStepTwo = isFormValidStepOne && !passwordError && !confirmPasswordError && termsOfUse;

	// 	if(validationStep===1) {
	// 		return isFormValidStepOne;
	// 	}

	// 	return isFormValidStepTwo;
	// }

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
					onClick={hadleBtnBackClick}
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
									<img src={avatarwoman} alt="Avatar woman" />
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
									<img src={avatarman} alt="Avatar man" />
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
								<Link to={ROUTES.SIGN_IN} className="registration_form_link">
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
									className="registration_form_terms-of-use_checkbox"
									value={termsOfUse}
									onChange={() => {
										setTermsOfUse(!termsOfUse);
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
										to={ROUTES.PRIVACY_POLICY}
										className="registration_form_terms-of-use-link"
									>
										политику конфиденциальности
									</Link>
									&nbsp;и&nbsp;
									<Link
										to={ROUTES.TERMS_OF_USE}
										className="registration_form_terms-of-use-link"
									>
										условия использования
									</Link>
								</span>
							</div>
							<Button
								label="Зарегистрироваться"
								type="submit"
								color="primary"
								size="large"
								className="registration_form_btn-continue"
							/>

							<span className="registration_form_span">
								У тебя уже есть аккаунт?{' '}
								<Link to={ROUTES.SIGN_IN} className="registration_form_link">
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
