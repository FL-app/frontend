/* eslint-disable no-nested-ternary */
import PropTypes from 'prop-types';
import { useState } from 'react';
import { useUser } from '../../context/AppContext';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import InputText from '../InputText/InputText';
import Button from '../Button/Button';
import './PopupAddFriend.scss';
import avatar from '../../images/icon_profile_man.png';
import success from '../../images/icon-success.svg';
import ValidationErrorMessages from '../../constants/enums/validation';
import { emailPattern } from '../../constants/regExp/validation';

function PopupAddFriend({ isOpen, onClose }) {
	const { currentUser } = useUser();

	const [step, setStep] = useState(1);
	const [emailError, setEmailError] = useState(
		ValidationErrorMessages.emptyEmailErrorText
	);
	const [emailDirty, setEmailDirty] = useState(false);
	const [foundFriend, setFoundFriend] = useState(null);
	const [isContinueBtnDisabled, setIsContinueBtnDisabled] = useState(true);
	const [enteredEmail, setEnteredEmail] = useState('');
	const [backButtonClicked, setBackButtonClicked] = useState(false);

	// @TODO Добавил email для теста потом убрать
	const testEmail = '1234@mail.ru';

	const handleChange = (evt) => {
		const { value } = evt.target;

		if (backButtonClicked) {
			setBackButtonClicked(false);
			setEnteredEmail(enteredEmail);
			return;
		}

		if (String(value).length === 0) {
			setEmailError(ValidationErrorMessages.emptyEmailErrorText);
			setFoundFriend(null);
			setIsContinueBtnDisabled(true);
		} else if (!value.match(emailPattern)) {
			setEmailError(ValidationErrorMessages.invalidEmailErrorText);
			setFoundFriend(null);
			setIsContinueBtnDisabled(true);
		} else if (currentUser.friends.some((friend) => friend.email === value)) {
			const friend = currentUser.friends.find((elem) => elem.email === value);
			setEmailError(ValidationErrorMessages.friendExistErrorText);
			setFoundFriend(friend);
			setIsContinueBtnDisabled(true);
		} else {
			setEmailError(ValidationErrorMessages.emptyString);
			setFoundFriend(null);
			setIsContinueBtnDisabled(false);
		}
		setEnteredEmail(value);
	};

	const blurHandler = () => {
		setBackButtonClicked(true);
		setEmailDirty(true);
	};

	const handleContinueButtonClick = () => {
		if (!emailError) {
			if (enteredEmail === testEmail) {
				setBackButtonClicked(true);
				setStep(2);
			} else {
				setBackButtonClicked(true);
				setStep(3);
			}
		} else {
			setEmailDirty(true);
		}
	};

	const handleSubmit = (evt) => {
		evt.preventDefault();
		if (step === 2) {
			setStep(4);
		} else {
			setStep(5);
		}
	};

	return (
		<PopupWithForm
			title={
				step === 1
					? 'Введи адрес электронной почты, с которой твой друг зарегистрирован в «Где друзья?»'
					: step === 2
					? `Добавить ${enteredEmail} в друзья?`
					: step === 3
					? `У ${enteredEmail} ещё нет приложения «Где друзья?» Хочешь отправить приглашение на электронную почту?`
					: step === 4
					? ''
					: ''
			}
			name="add-friend"
			isOpen={isOpen}
			onClose={() => {
				onClose();
				setStep(1);
				setEnteredEmail('');
				setIsContinueBtnDisabled(true);
			}}
		>
			<div className="add-friend__container">
				{step === 2 ? (
					<div className="friends-list__item add-friend__item">
						<img
							src={avatar}
							alt="Николай иронов"
							className="friends-list__item-img"
						/>
						<span>Николай Иронов</span>
					</div>
				) : step === 3 ? (
					<div />
				) : step === 4 ? (
					<div className="add-friend__success">
						<img
							src={success}
							alt="Success"
							className="add-friend__success-icon"
						/>
						<div className="add-friend__success-title">
							Запрос на добавление <br />
							отправлен
						</div>
					</div>
				) : step === 5 ? (
					<div className="add-friend__success">
						<img
							src={success}
							alt="Success"
							className="add-friend__success-icon"
						/>
						<div className="add-friend__success-title">
							Приглашение отправлено
						</div>
					</div>
				) : (
					<>
						<InputText
							label="Email"
							id="email"
							name="email"
							isRequired
							inputValue={enteredEmail}
							onChange={handleChange}
							inputError={emailError}
							inputDirty={emailDirty}
							onBlur={blurHandler}
							className=""
						/>
						{foundFriend && (
							<div className="friends-list__item add-friend__item">
								<img
									src={foundFriend.avatar}
									alt={foundFriend.name}
									className="friends-list__item-img"
								/>
								<span>{foundFriend.name}</span>
							</div>
						)}
					</>
				)}
			</div>

			<div className="add-friend__btn-container">
				{step === 1 ? (
					<>
						<Button
							label="Отмена"
							type="button"
							color="secondary"
							size="medium"
							onClick={onClose}
							className="add-friend__btn"
						/>
						<Button
							label="Подтвердить"
							type="button"
							color="primary"
							size="medium"
							className="add-friend__btn"
							onClick={handleContinueButtonClick}
							disabled={isContinueBtnDisabled}
						/>
					</>
				) : step === 2 ? (
					<>
						<Button
							label="Назад"
							type="button"
							color="secondary"
							size="medium"
							className="add-friend__btn"
							onClick={() => {
								setBackButtonClicked(true);
								setStep(1);
							}}
						/>
						<Button
							label="Добавить"
							type="button"
							color="primary"
							size="medium"
							className="add-friend__btn"
							onClick={() => handleSubmit()}
						/>
					</>
				) : step === 3 ? (
					<>
						<Button
							label="Назад"
							type="button"
							color="secondary"
							size="medium"
							className="add-friend__btn"
							onClick={() => {
								setBackButtonClicked(true);
								setStep(1);
							}}
						/>
						<Button
							label="Отправить"
							type="button"
							color="primary"
							size="medium"
							className="add-friend__btn"
							onClick={() => handleSubmit()}
						/>
					</>
				) : (
					<Button
						label="Добавить еще друзей"
						type="button"
						color="primary"
						size="large"
						onClick={() => {
							setStep(1);
						}}
					/>
				)}
			</div>
		</PopupWithForm>
	);
}

PopupAddFriend.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
};

PopupAddFriend.defaultProps = {
	isOpen: false,
	onClose: undefined,
};

export default PopupAddFriend;
