import './Login.scss';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import loginUser from '../../store/thunk/loginUser';
import { Button, InputPassword, InputText } from '../../components';
import RoutesPath from '../../constants/enums/routesPath';
import { emailPattern } from '../../constants/regExp/validation';
import ValidationErrorMessages from '../../constants/enums/validation';
import { AppDispatch, RootState } from '../../store';
import InputTypes from '../../constants/enums/inputTypes';

function Login() {
	const navigate = useNavigate();

	const [userData, setUserData] = useState({
		email: '',
		password: '',
	});

	const [emailDirty, setEmailDirty] = useState(false);
	const [passwordDirty, setPasswordDirty] = useState(false);

	const [emailError, setEmailError] = useState(
		ValidationErrorMessages.emptyEmailErrorText
	);
	const [passwordError, setPasswordError] = useState(
		ValidationErrorMessages.emptyPasswordErrorText
	);

	const [passwordType, setPasswordType] = useState(InputTypes.password);

	const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = evt.target;

		setUserData({
			...userData,
			[name]: value,
		});

		switch (name) {
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
				break;
			default:
				break;
		}
	};

	const blurHandler = (evt: React.FocusEvent<HTMLInputElement>) => {
		switch (evt.target.name) {
			case 'email':
				setEmailDirty(true);
				break;
			case 'password':
				setPasswordDirty(true);
				break;
			default:
				break;
		}
	};

	const handlePasswordBtnClick = () => {
		if (passwordType === InputTypes.password) {
			setPasswordType(InputTypes.text);
		} else {
			setPasswordType(InputTypes.password);
		}
	};

	const handleBtnBackClick = () => {
		navigate(-1);
	};

	const formValidCheck = () => !emailError && !passwordError;

	const dispatch = useDispatch<AppDispatch>();
	const { errorMessage, isAuthenticated, requestCounter } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		if (isAuthenticated) navigate(RoutesPath.map);
		if (!isAuthenticated && errorMessage) {
			const errors = JSON.parse(errorMessage) as { detail: string };
			setPasswordError(ValidationErrorMessages.emptyString);
			if (errors.detail) {
				setPasswordError(ValidationErrorMessages.wrongLoginOrPassword);
			}
		}
	}, [navigate, errorMessage, isAuthenticated, requestCounter]);

	const handleSubmit = () => {
		if (formValidCheck()) dispatch<void>(loginUser(userData));
		setEmailDirty(true);
		setPasswordDirty(true);
	};

	return (
		<section className="signin">
			<div className="signin_container">
				<button
					type="button"
					className="signin_btn-back"
					onClick={handleBtnBackClick}
					aria-label="Back"
				/>
				<div className="signin_vector-1" />
				<div className="signin_vector-2" />
				<div className="signin_semicircle" />
				<div className="signin_spiral" />
				<form className="signin_form">
					<h1 className="signin_form_title">С возвращением</h1>
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
					<InputPassword
						label="Пароль"
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

					<Button
						label="Войти"
						type="button"
						color="primary"
						size="large"
						className="registration_form_btn-continue"
						onClick={handleSubmit}
					/>
					<span className="signin_form_span">
						Еще нет аккаунта?{' '}
						<Link to={RoutesPath.registration} className="signin_form_link">
							Зарегистрироваться
						</Link>
					</span>
				</form>
			</div>
		</section>
	);
}

export default Login;