import './GeneralMenuPopup.scss';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { logout } from '../../store/slices/user';
import UserAvatar from '../UserAvatar/UserAvatar';
import Checkbox from '../Checkbox/Checkbox';
import chat from '../../images/chat_menu.svg';
import RoutesPath from '../../constants/enums/routesPath';
import friendsNew from '../../images/friendsNew_menu.svg';
import places from '../../images/places_menu.svg';
import profile from '../../images/profile_menu.svg';
import settings from '../../images/settings_menu.svg';
import events from '../../images/events_menu.svg';

interface GeneralMenuPopupProps {
	onClose: () => void;
	userStatus: string;
	chooseInvisible: () => void;
	isActiveInvisible: boolean;
	openSettingsMenuPopup: () => void;
}

function GeneralMenuPopup(props: GeneralMenuPopupProps) {
	const {
		onClose,
		userStatus,
		chooseInvisible,
		isActiveInvisible,
		openSettingsMenuPopup,
	} = props;
	const dispatch = useDispatch();

	const handleExitClick = () => {
		dispatch(logout());
	};

	return (
		<div className="generalMenuPopup__container">
			<div>
				<div className="generalMenuPopup__header">
					<UserAvatar />
					{userStatus === '' ? (
						<div className="generalMenuPopup__status">Статус не выбран</div>
					) : (
						<div className="generalMenuPopup__status">{userStatus}</div>
					)}
				</div>
				<div className="generalMenuPopup__checkbox-container">
					<Checkbox
						option="Режим невидимки"
						chooseOption={chooseInvisible}
						isActiveOption={isActiveInvisible}
					/>
				</div>
				<section className="generalMenuPopup__navigation">
					<Link
						to={RoutesPath.chat}
						className="generalMenuPopup__link"
						onClick={onClose}
					>
						<img className="generalMenuPopup__link-img" src={chat} alt="Чат" />
						<p className="generalMenuPopup__link-text">Чат</p>
					</Link>
					<Link
						to={RoutesPath.friends}
						className="generalMenuPopup__link"
						onClick={onClose}
					>
						<img
							className="generalMenuPopup__link-img"
							src={friendsNew}
							alt="Друзья"
						/>
						<p className="generalMenuPopup__link-text">Друзья</p>
					</Link>
					<Link to={RoutesPath.comingSoon} className="generalMenuPopup__link">
						<img
							className="generalMenuPopup__link-img"
							src={places}
							alt="Места"
						/>
						<p className="generalMenuPopup__link-text">Места</p>
					</Link>
					<Link to={RoutesPath.comingSoon} className="generalMenuPopup__link">
						<img
							className="generalMenuPopup__link-img"
							src={events}
							alt="Мероприятия"
						/>
						<p className="generalMenuPopup__link-text">Мероприятия</p>
					</Link>
					<Link
						to={RoutesPath.profile}
						className="generalMenuPopup__link"
						onClick={onClose}
					>
						<img
							className="generalMenuPopup__link-img"
							src={profile}
							alt="Профиль"
						/>
						<p className="generalMenuPopup__link-text">Профиль</p>
					</Link>
					<button
						type="button"
						onClick={openSettingsMenuPopup}
						className="generalMenuPopup__link generalMenuPopup__link_settings"
					>
						<img
							className="generalMenuPopup__link-img"
							src={settings}
							alt="Настройки"
						/>
						<p className="generalMenuPopup__link-text">Настройки</p>
					</button>
				</section>
			</div>
			<Link
				to={RoutesPath.login}
				className="generalMenuPopup__button"
				onClick={handleExitClick}
			>
				Выйти из профиля
			</Link>
		</div>
	);
}

export default GeneralMenuPopup;
