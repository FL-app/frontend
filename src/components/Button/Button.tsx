import './Button.scss';
import { ButtonProps } from '../../types/ButtonProps.interface';

function Button(props: ButtonProps) {
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
}

export default Button;
