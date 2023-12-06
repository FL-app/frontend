import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, PopupWithForm } from '../../components';
import MainLayout from '../../layouts/MainLayout';
import spiralPng from '../../images/spiral-banner.png';
import vectorCircle from '../../images/vector-signin-2.svg';
import avatarMale from '../../images/icon_profile_man.png';
import avatarFemale from '../../images/icon_profile_woman.png';
import './Profile.scss';
import setNickname from '../../store/thunk/setNickname';
import { AppDispatch, RootState } from '../../store';
import Gender from '../../constants/enums/gender';

const recommendedStatuses = [
	'На работе',
	'На мероприятии',
	'Не беспокоить',
].slice(0, 3);

function Profile() {
	const currentUser = useSelector((state: RootState) => state.user);
	const [nicknamePopupOpened, setNicknamePopupOpened] = useState(false);
	const [inviteFriendsPopupOpened, setInviteFriendsPopupOpened] =
		useState(false);
	const [formValues, setFormValues] = useState({
		status: currentUser.status,
		nicknameValue: currentUser.username,
		inviteEmailValue: '',
	});
	const dispatch = useDispatch<AppDispatch>();
	const handleStatusChange = (newStatus: string) => {
		setFormValues((prevState) => ({
			...prevState,
			status: newStatus,
		}));
	};

	const handleSubmitNickname = () => {
		const updatedUser = { ...currentUser };
		updatedUser.username = formValues.nicknameValue;
		dispatch<void>(
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

	const handleSubmitInvite = () => {
		setFormValues((prevState) => ({ ...prevState, inviteEmailValue: '' }));
		setInviteFriendsPopupOpened(false);
	};

	function getUserAvatar(sex: Gender) {
		return sex === Gender.male ? avatarMale : avatarFemale;
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
								src={getUserAvatar(currentUser.gender as Gender)}
								alt="Avatar"
								className="profile-avatar-image"
							/>
						</button>
						<div className="profile-user-info">
							<div className="profile-user-name">{`${currentUser.first_name} ${currentUser.last_name}`}</div>
							<div className="profile-user-nickname">
								{currentUser.username}
							</div>
							<button
								type="button"
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
									onClick={() => {
										setFormValues((prevState) => ({
											status: statusValue,
											nicknameValue: prevState.nicknameValue,
											inviteEmailValue: prevState.inviteEmailValue,
										}));
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
							onClick={() => setInviteFriendsPopupOpened(true)}
							className="profile-invite-banner-add-btn"
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
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setFormValues((prevState) => ({
									...prevState,
									nicknameValue: e.target.value,
								}));
							}}
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
										nicknameValue: currentUser.username,
									}));
									setNicknamePopupOpened(false);
								}}
								className="popup-button"
							/>
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
					isOpen={inviteFriendsPopupOpened}
					onClose={() => setInviteFriendsPopupOpened(false)}
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
							onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
								setFormValues((prevState) => ({
									...prevState,
									inviteEmailValue: e.target.value,
								}));
							}}
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
									setInviteFriendsPopupOpened(false);
								}}
								className="popup-button"
							/>
							<Button
								label="Подтвердить"
								type="submit"
								color="primary"
								size="medium"
								onClick={() => {
									setInviteFriendsPopupOpened(false);
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
}

export default Profile;
