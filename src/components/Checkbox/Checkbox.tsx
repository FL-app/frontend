import './Checkbox.scss';

interface CheckboxProps {
	option: string;
	chooseOption: () => void;
	isActiveOption: boolean;
}

const Checkbox = (props: CheckboxProps) => {
	const { option, chooseOption, isActiveOption } = props;
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
};

export default Checkbox;
