import PropTypes from 'prop-types';
import './InputSearch.scss';

const InputSearch = ({ handleSearch }) => {
	const handleChange = (e) => {
		const searchTerm = e.target.value;
		handleSearch(searchTerm);
	};

	return (
		<input
			type="text"
			placeholder="Поиск друзей"
			onChange={handleChange}
			className="input-search"
		/>
	);
};

InputSearch.propTypes = {
	handleSearch: PropTypes.func,
};

InputSearch.defaultProps = {
	handleSearch: undefined,
};

export default InputSearch;
