export declare interface ButtonProps {
  label: string;
  type?: 'button' | 'submit' | 'reset';
  color?: 'primary' | 'secondary';
  size: 'medium' | 'large';
  disabled: boolean;
  onClick?: () => void;
  className?: string;
}
