import './Button.scss';

interface IButtonProps {
	label: string,
	url?: string,
	type: 'link' | 'button' | 'submit',
	color?: 'primary' | 'secondary',
	size: 'medium' | 'large',
	disabled?: boolean,
	onClick?: () => void,
	className?: string
}

export default function Button({
	label,
	url = undefined,
	type = 'button',
	color = undefined,
	size = 'medium',
	disabled = false,
	onClick = undefined,
	className = '',
}: IButtonProps) {
	const props = {
		disabled,
		onClick,
	};

	switch (type) {
		case 'link':
			return (
				<a
					{...props}
					href={url}
					className={`button button_link button_${size} button_color-${color} ${className}`}
				>
					{label}
				</a>
			);

		default:
			return (
				<button
					{...props}
					type={type}
					className={`button button_${size} button_color-${color} ${className}`}
				>
					{label}
				</button>
			);
	}
}
