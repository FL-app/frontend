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
			<input
				placeholder="Введите имя друга"
				onChange={handleSearch}
				className="header__search"
				autoFocus
				hidden={!handleSearch}
			/>
		</header>
	);
}

export default Header;
