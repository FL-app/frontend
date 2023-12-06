import InputSearch from '../InputSearch/InputSearch';
import './Header.scss';

interface HeaderProps {
	handleSearch?: () => void;
	className: string;
	openGeneralMenuPopup: () => void;
}

function Header(props: HeaderProps) {
	const { handleSearch, className, openGeneralMenuPopup } = props;

	return (
		<header className={className}>
			<button
				className="header__menu"
				type="button"
				aria-label="Кнопка меню"
				onClick={openGeneralMenuPopup}
			/>
			{handleSearch && <InputSearch handleSearch={handleSearch} />}
		</header>
	);
}

export default Header;
