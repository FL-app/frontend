import { Link } from 'react-router-dom';
import './SettingsMenuPopup.scss';
import Checkbox from '../Checkbox/Checkbox';
import RoutesPath from '../../constants/enums/routesPath';

interface SettingsMenuPopupProps {
	onClose: () => void;
	chooseNightTheme: () => void;
	isActiveNightTheme: boolean;
	deleteAccount: () => void;
}

function SettingsMenuPopup(props: SettingsMenuPopupProps) {
	const { onClose, chooseNightTheme, isActiveNightTheme, deleteAccount } =
		props;
	return (
		<>
			<div className="settingsMenuPopup__header">
				<button
					type="button"
					className="settingsMenuPopup__button settingsMenuPopup__button_arrow-back"
					aria-label="Вернуться в главное меню"
					onClick={onClose}
				/>
				<h1 className="settingsMenuPopup__title">Настройки</h1>
			</div>
			<div className="settingsMenuPopup__checkbox-container">
				<Checkbox
					option="Тёмная тема"
					chooseOption={chooseNightTheme}
					isActiveOption={isActiveNightTheme}
				/>
			</div>
			<section className="settingsMenuPopup__navigation">
				<div className="settingsMenuPopup__link-container">
					<Link className="settingsMenuPopup__link" to={RoutesPath.comingSoon}>
						Видимость на карте
					</Link>
					<Link className="settingsMenuPopup__link" to={RoutesPath.comingSoon}>
						Сменить пароль
					</Link>
				</div>
				<div className="settingsMenuPopup__link-container">
					<Link className="settingsMenuPopup__link" to={RoutesPath.termsOfUse}>
						Условия использования
					</Link>
					<Link
						className="settingsMenuPopup__link"
						to={RoutesPath.privacyPolicy}
					>
						Политика конфиденциальности
					</Link>
					<button
						type="button"
						className="settingsMenuPopup__button settingsMenuPopup__button_delete-account"
						onClick={deleteAccount}
					>
						Удалить аккаунт
					</button>
				</div>
			</section>
		</>
	);
}

export default SettingsMenuPopup;
