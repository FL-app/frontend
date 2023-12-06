import './ButtonUserLocation.scss';

interface ButtonUserLocationProps {
	handleClick: () => void;
}

export default function ButtonUserLocation(props: ButtonUserLocationProps) {
	const { handleClick } = props;

	return (
		<button
			className="buttonUserLocation"
			type="button"
			aria-label="Мое местоположение на карте"
			onClick={handleClick}
		/>
	);
}
