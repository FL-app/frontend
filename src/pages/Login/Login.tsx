import './Login.scss';
import React, { FormEvent, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, InputPassword, InputText } from '../../components';
import RoutesPath from '../../constants/enums/routesPath';
import { emailPattern } from '../../constants/regExp/validation';
import ValidationErrorMessages from '../../constants/enums/validation';
import InputTypes from '../../constants/enums/inputTypes';
import { useCreateTokenMutation } from '../../store/rtk/tokensApi';
import LoginDTO from '../../types/LoginDTO.interface';
import { useGetUserMutation } from '../../store/rtk/userApi';
import { RootState } from '../../store';
import Loader from '../../components/Loader/Loader';

function Login() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading } = useSelector(
    (state: RootState) => state.user,
  );
  const [createToken, { isError }] = useCreateTokenMutation();
  const [getUser] = useGetUserMutation();
  const [userData, setUserData] = useState({} as LoginDTO);
  const [emailDirty, setEmailDirty] = useState(false);
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [emailError, setEmailError] = useState(
    ValidationErrorMessages.emptyEmailErrorText,
  );
  const [passwordError, setPasswordError] = useState(
    ValidationErrorMessages.emptyPasswordErrorText,
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
  const handleSubmit = () => {
    if (!emailError && !passwordError) {
      createToken(userData)
        .unwrap()
        .then(() => {
          getUser(null)
            .unwrap()
            .catch(() => {});
        })
        .catch(() => {});
    }
    setEmailDirty(true);
    setPasswordDirty(true);
  };
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmit();
  };
  useEffect(() => {
    if (isAuthenticated) navigate(RoutesPath.map);
    if (!isAuthenticated && isError) {
      setPasswordError(ValidationErrorMessages.emptyString);
      setPasswordError(ValidationErrorMessages.wrongLoginOrPassword);
    }
  }, [navigate, isAuthenticated, isError]);

  return isLoading ? (
    <Loader />
  ) : (
    <section className="signin">
      <div className="signin_container">
        <button
          type="button"
          className="signin_btn-back"
          onClick={() => {
            navigate(-1);
          }}
          aria-label="Back"
        />
        <div className="signin_vector-1" />
        <div className="signin_vector-2" />
        <div className="signin_semicircle" />
        <div className="signin_spiral" />
        <form className="signin_form" onSubmit={handleFormSubmit}>
          <h1 className="signin_form_title">С возвращением</h1>
          <InputText
            label="Email"
            id="email"
            name="email"
            type={InputTypes.email}
            inputValue={userData.email}
            onChange={handleChange}
            onBlur={blurHandler}
            inputDirty={emailDirty}
            inputError={emailError}
            placeholder="Введите адрес электронной почты"
          />
          <InputPassword
            passwordType={passwordType}
            id="password"
            name="password"
            inputValue={userData.password}
            onChange={handleChange}
            onBlur={blurHandler}
            passwordDirty={passwordDirty}
            passwordError={passwordError}
            onPasswordBtnClick={handlePasswordBtnClick}
            placeholder="Введите пароль"
          />
          <Button
            label="Войти"
            type="submit"
            color="primary"
            size="large"
            className="registration_form_btn-continue"
            onClick={handleSubmit}
            disabled={!!emailError || !!passwordError}
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
