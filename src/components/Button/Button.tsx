import './Button.scss';

interface IButtonProps {
	label: string;
	url?: string;
	type?: 'link' | 'button' | 'submit' | 'reset';
	color?: 'primary' | 'secondary';
	size: 'medium' | 'large';
	disabled?: boolean;
	onClick?: () => void;
	className?: string;
}

const Button = (props: IButtonProps) => {
	const { label, url, type, color, size, disabled, onClick, className } = props;

	const getLink = () => (
		<a
			href={url}
			className={`button button_link button_${size} button_color-${color} ${className}`}
		>
			{label}
		</a>
	);

	const getButton = () => (
		<button
			disabled={disabled}
			onClick={onClick}
			type={type !== 'link' ? type : 'button'}
			className={`button button_${size} button_color-${color} ${className}`}
		>
			{label}
		</button>
	);

	return type === 'link' ? getLink() : getButton();
};

export default Button;
