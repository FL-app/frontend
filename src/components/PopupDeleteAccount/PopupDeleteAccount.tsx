import { Link } from 'react-router-dom';
import { useState } from 'react';
import './PopupDeleteAccount.scss';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import Button from '../Button/Button';
import RoutesPath from '../../constants/enums/routesPath';
import success from '../../images/icon-success.svg';

interface PopupDeleteAccountProps {
	isOpen: boolean;
	onClose: () => void;
	deleteAccount?: () => void;
}

function PopupDeleteAccount(props: PopupDeleteAccountProps) {
	const { isOpen, onClose, deleteAccount } = props;
	const [title] = useState(
		'Вы действительно хотите удалить свой профиль в «Где друзья»?'
	);

	return (
		<PopupWithForm
			title={title}
			name="delete-account"
			isOpen={isOpen}
			onClose={onClose}
		>
			{title === '' && (
				<div className="delete-account__container">
					<img
						className="delete-account__img"
						src={success}
						alt="Профиль удалён"
					/>
					<p className="delete-account__text">Профиль удалён</p>
				</div>
			)}
			<div className="delete-account__btn-container">
				{title !== '' && (
					<>
						<Button
							className="delete-account__btn"
							label="Отмена"
							type="button"
							color="secondary"
							size="medium"
							onClick={onClose}
						/>
						<Button
							className="delete-account__btn"
							label="Удалить"
							type="button"
							color="primary"
							size="medium"
							onClick={deleteAccount}
						/>
					</>
				)}
				{title === '' && (
					<Link to={RoutesPath.root}>
						<Button
							label="На главную"
							type="button"
							color="primary"
							size="medium"
						/>
					</Link>
				)}
			</div>
		</PopupWithForm>
	);
}

export default PopupDeleteAccount;
