import { ChangeEvent, useState } from 'react';
import './PopupDeleteAccount.scss';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { useDispatch } from 'react-redux';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Button from '../Button/Button';
import success from '../../images/icon-success.svg';
import AppMessages from '../../constants/enums/appMessages';
import { InputPassword } from '../index';
import InputTypes from '../../constants/enums/inputTypes';
import { useDeleteAccountMutation } from '../../store/rtk/userApi';
import ValidationErrorMessages from '../../constants/enums/validation';
import { logout } from '../../store/slices/user';

interface PopupDeleteAccountProps {
	isOpen: boolean;
	onClose: () => void;
}

function PopupDeleteAccount(props: PopupDeleteAccountProps) {
	const { isOpen, onClose } = props;
	const dispatch = useDispatch();
	const [title, setTitle] = useState(AppMessages.deleteAccount);
	const [step, setStep] = useState(0);
	const [input, setInput] = useState('');
	const [deleteAccount, { isLoading }] = useDeleteAccountMutation();
	const [passwordError, setPasswordError] = useState(
		ValidationErrorMessages.emptyString
	);
	const handleConfirmDeleteAccount = () => {
		setTitle(AppMessages.confirmDeleteAccount);
		setStep(1);
	};

	const handleCancel = () => {
		setStep(0);
		setPasswordError(ValidationErrorMessages.emptyString);
		setInput('');
		onClose();
	};

	function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
		return typeof error === 'object' && error != null && 'status' in error;
	}

	const handleDeleteAccount = () => {
		deleteAccount({ current_password: input })
			.unwrap()
			.catch((err) => {
				if (isFetchBaseQueryError(err)) {
					setPasswordError(ValidationErrorMessages.wrongPassword);
				} else {
					setTitle(AppMessages.emptyString);
					setStep(2);
					setTimeout(() => {
						dispatch(logout());
					}, 3000);
				}
			});
	};
	const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
		setInput(event.target.value);
	};

	return (
		<PopupWithForm
			title={title}
			name="delete-account"
			isOpen={isOpen}
			onClose={handleCancel}
		>
			{step === 2 && (
				<div className="delete-account__container">
					<img
						className="delete-account__img"
						src={success}
						alt="Профиль удалён"
					/>
					<p className="delete-account__text">Профиль удалён</p>
				</div>
			)}
			{step === 1 && (
				<InputPassword
					label="Пароль"
					passwordType={InputTypes.password}
					id="confirmPassword"
					name="confirmPassword"
					inputValue={input}
					onChange={handleInputChange}
					passwordDirty={
						passwordError === ValidationErrorMessages.wrongPassword
					}
					passwordError={passwordError}
					placeholder="Введите пароль"
				/>
			)}
			<div className="delete-account__btn-container">
				{step === 0 && (
					<>
						<Button
							className="delete-account__btn"
							label="Отмена"
							type="button"
							color="secondary"
							size="medium"
							onClick={handleCancel}
							disabled={false}
						/>
						<Button
							className="delete-account__btn"
							label="Удалить"
							type="button"
							color="primary"
							size="medium"
							onClick={handleConfirmDeleteAccount}
							disabled={false}
						/>
					</>
				)}
				{step === 1 && (
					<>
						<Button
							className="delete-account__btn"
							label="Отмена"
							type="button"
							color="secondary"
							size="medium"
							onClick={handleCancel}
							disabled={false}
						/>
						<Button
							className="delete-account__btn"
							label={isLoading ? 'Удаляем аккаунт...' : 'Подтвердить'}
							type="button"
							color="primary"
							size="large"
							onClick={handleDeleteAccount}
							disabled={false}
						/>
					</>
				)}
			</div>
		</PopupWithForm>
	);
}

export default PopupDeleteAccount;
