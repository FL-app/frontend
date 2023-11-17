import PropTypes from 'prop-types';
import InputSearch from '../InputSearch/InputSearch.jsx';
import './Header.scss';

const Header = ({ handleSearch, className, openGeneralMenuPopup }) => (
	<header className={className}>
		<button
			className="header__menu"
			type="button"
			aria-label="Кнопка меню"
			onClick={openGeneralMenuPopup}
		/>
		{/* если нет пропса то только кнопка меню */}
		{handleSearch && <InputSearch handleSearch={handleSearch} />}
	</header>
);

Header.propTypes = {
	handleSearch: PropTypes.func,
	className: PropTypes.string.isRequired,
	openGeneralMenuPopup: PropTypes.func.isRequired,
};

Header.defaultProps = {
	handleSearch: undefined,
};

export default Header;
