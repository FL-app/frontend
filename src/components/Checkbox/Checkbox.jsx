import './Checkbox.scss';
import PropTypes from 'prop-types';

function Checkbox({ option, chooseOption, isActiveOption }) {
	return (
		<label className="checkbox" htmlFor="checkbox">
			<span className="checkbox__title">{option}</span>
			<div className="checkbox__container">
				<input
					id="checkbox"
					className="checkbox__input"
					type="checkbox"
					onChange={chooseOption}
					checked={isActiveOption}
				/>
				<span className="checkbox__toggle" />
			</div>
		</label>
	);
}

Checkbox.propTypes = {
	option: PropTypes.string.isRequired,
	chooseOption: PropTypes.func.isRequired,
	isActiveOption: PropTypes.bool.isRequired,
};

export default Checkbox;
