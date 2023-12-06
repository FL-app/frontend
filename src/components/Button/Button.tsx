import './Button.scss';

interface IButtonProps {
	label: string;
	type?: 'button' | 'submit' | 'reset';
	color?: 'primary' | 'secondary';
	size: 'medium' | 'large';
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}

const Button = (props: IButtonProps) => {
	const { label, type, color, size, disabled, onClick, className } = props;

	return (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type === 'button' ? 'button' : 'submit'}
			className={`button button_${size} button_color-${color} ${className}`}
		>
			{label}
		</button>
	);
};

export default Button;
