import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, PopupWithForm, Input } from '../../components';
import MainLayout from '../../layouts/MainLayout.tsx';
import spiralPng from '../../images/spiral-banner.png';
import vectorCircle from '../../images/vector-signin-2.svg';
import avatarMale from '../../images/icon_profile_man.png';
import avatarFemale from '../../images/icon_profile_woman.png';
// import { useUser } from '../../context/AppContext';
import './Profile.scss';
import setNickname from '../../store/thunk/setNickname';

const recommendedStatuses = [
	'На работе',
	'На мероприятии',
	'Не беспокоить',
].slice(0, 3);

export const Profile = () => {
	const currentUser = useSelector((state) => state.user);
	// const { currentUser, setCurrentUser } = useUser();
	const [nicknamePopupOpened, setNicknamePopupOpened] = useState(false);
	const [inviteFreindsPopupOpened, setInviteFreindsPopupOpened] =
		useState(false);
	const [formValues, setFormValues] = useState({
		status: currentUser.status,
		nicknameValue: currentUser.username,
		inviteEmailValue: '',
	});

	const dispatch = useDispatch();

	// @TODO Переделать статусы через Redux

	// const handleSubmitStatus = (newStatus) => {
	// 	setCurrentUser((prevState) => ({
	// 		...prevState,
	// 		status: newStatus,
	// 	}));
	// 	setFormValues((prevState) => ({
	// 		...prevState,
	// 		status: '',
	// 	}));
	// };

	const handleStatusChange = (newStatus) => {
		setFormValues((prevState) => ({
			...prevState,
			status: newStatus,
		}));
	};

	const handleSubmitNickname = (e) => {
		e.preventDefault();
		const updatedUser = { ...currentUser };
		updatedUser.username = formValues.nicknameValue;
		dispatch(
			setNickname({
				username: updatedUser.username,
				token: currentUser.access,
			})
		);

		setFormValues((prevState) => ({
			...prevState,
			nicknameValue: updatedUser.username,
		}));

		setNicknamePopupOpened(false);
	};

	const handleSubmitInvite = (e) => {
		e.preventDefault();
		// Здесь нужно реализовать логику отправки приглашения
		setFormValues((prevState) => ({ ...prevState, inviteEmailValue: '' }));
		setInviteFreindsPopupOpened(false);
	};

	function getUserAvatar(sex) {
		return sex === 'male' ? avatarMale : avatarFemale;
	}

	return (
		<section className="profile">
			<div className="profile-container">
				<MainLayout headerClassName="header">
					<h1 className="profile-heading">Профиль</h1>
					<div className="profile-user-container">
						<button
							className="profile-avatar"
							onClick={(f) => f}
							type="button"
							aria-label="Изменить аватар"
						>
							<img
								src={getUserAvatar(currentUser.gender)}
								alt="Avatar"
								className="profile-avatar-image"
							/>
						</button>
						{/* <Avatar url={getUserAvatar(UserInfo.sex)} /> */}
						<div className="profile-user-info">
							<div className="profile-user-name">{`${currentUser.first_name} ${currentUser.last_name}`}</div>
							<div className="profile-user-nickname">
								{currentUser.username}
							</div>
							<button
								className="profile-user-change-nickname"
								aria-label="Изменить ник"
								onClick={() => setNicknamePopupOpened(true)}
							>
								Изменить ник
							</button>
						</div>
					</div>
					<form
						className="profile-status-container"
						onSubmit={(e) => {
							e.preventDefault();
							// handleSubmitStatus(formValues.status);
						}}
					>
						<label htmlFor="status" className="profile-status-label">
							Твой статус
							<input
								type="text"
								placeholder={currentUser.status || 'Хочу на прогулку'}
								value={formValues.status}
								className="profile-status-input"
								id="status"
								onChange={(e) => {
									e.preventDefault();
									handleStatusChange(e.target.value);
								}}
							/>
						</label>
						<div className="profile-status-bar">
							{recommendedStatuses.map((statusValue) => (
								<button
									key={statusValue}
									type="button"
									onClick={(e) => {
										e.preventDefault();
										// handleSubmitStatus(statusValue);
									}}
									className="profile-status-bar-button"
								>
									{statusValue}
								</button>
							))}
						</div>
						<button type="submit" style={{ display: 'none' }}>
							{' '}
						</button>
					</form>
					<div className="profile-invite-banner">
						<div className="profile-invite-banner-text-container">
							<h2 className="profile-invite-banner-heading">
								Пригласи новых друзей
							</h2>
							<p className="profile-invite-banner-text">
								Добавить новых друзей с помощью электронной почты
							</p>
						</div>
						<Button
							label="Добавить"
							type="button"
							color="secondary"
							size="medium"
							onClick={() => setInviteFreindsPopupOpened(true)}
							className="profile-invite-banner-add-btn"
							onSubmit={() => void 0}
						/>
						<img
							className="profile-invite-banner-circle"
							src={vectorCircle}
							alt="векторный круг"
						/>
						<div className="profile-invite-banner-fixed-spiral">
							<img
								className="profile-invite-banner-spiral"
								src={spiralPng}
								alt="спираль"
							/>
						</div>
					</div>
				</MainLayout>
				<PopupWithForm
					title=""
					name="change-nickname"
					isOpen={nicknamePopupOpened}
					onClose={() => setNicknamePopupOpened(false)}
					onSubmit={handleSubmitNickname}
				>
					<>
						<Input
							id="change-nickname"
							name="change-nickname"
							label="Напиши твой ник"
							placeholder="Имя пользователя"
							className=""
							inputValue={formValues.nicknameValue}
							onChange={(e) => {
								setFormValues((prevState) => ({
									...prevState,
									nicknameValue: e.target.value,
								}));
							}}
							onBlur={() => void 0}
						/>
						<div className="popup-button-container">
							<Button
								label="Отмена"
								type="button"
								color="secondary"
								size="medium"
								onClick={() => {
									setFormValues((prevState) => ({
										...prevState,
										nicknameValue: currentUser.nickname,
									}));
									setNicknamePopupOpened(false);
								}}
								className="popup-button"
							/>
							{/* TODO отправка - ожидание ответа - вызов попапа с результатом */}
							<Button
								label="Готово"
								type="submit"
								color="primary"
								size="medium"
								onClick={handleSubmitNickname}
								className="popup-button"
							/>
						</div>
					</>
				</PopupWithForm>

				<PopupWithForm
					title="Введи адрес электронной почты. Мы отправим другу письмо с приглашением"
					name="invite-form"
					isOpen={inviteFreindsPopupOpened}
					onClose={() => setInviteFreindsPopupOpened(false)}
					onSubmit={handleSubmitInvite}
				>
					<>
						<Input
							id="input-email"
							name="input-email"
							label="Email"
							placeholder="Электронная почта"
							className=""
							inputValue={formValues.inviteEmailValue}
							onChange={(e) => {
								setFormValues((prevState) => ({
									...prevState,
									inviteEmailValue: e.target.value,
								}));
							}}
							onBlur={() => void 0}
						/>
						<div className="popup-button-container">
							<Button
								label="Отмена"
								type="button"
								color="secondary"
								size="medium"
								onClick={() => {
									setFormValues((prevState) => ({
										...prevState,
										inviteEmailValue: '',
									}));
									setInviteFreindsPopupOpened(false);
								}}
								className="popup-button"
							/>
							{/* TODO отправка - ожидание ответа - вызов попапа с результатом */}
							<Button
								label="Подтвердить"
								type="submit"
								color="primary"
								size="medium"
								onClick={(e) => {
									e.preventDefault();
									// Функция с отправко сообщения другу на почту
									setInviteFreindsPopupOpened(false);
									setFormValues((prevState) => ({
										...prevState,
										inviteEmailValue: '',
									}));
								}}
								className="popup-button"
							/>
						</div>
					</>
				</PopupWithForm>
			</div>
		</section>
	);
};
