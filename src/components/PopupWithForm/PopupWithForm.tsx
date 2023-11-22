import React, { FC, ReactNode, MouseEvent } from 'react';
import './PopupWithForm.scss';

interface IProps {
	title?: string;
	name: string;
	children?: ReactNode;
	isOpen: boolean;
	onClose: () => void;
	onSubmit?: () => void;
	formWidth?: string;
}

const PopupWithForm: FC<IProps> = ({
	title = '',
	name,
	children,
	isOpen = false,
	onClose,
	onSubmit,
	formWidth = '320px',
}) => {
	function handleMouseDown(evt: MouseEvent<HTMLDivElement>) {
		if (evt.target === evt.currentTarget) {
			onClose();
		}
	}

	return (
		<div
			className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
			onMouseDown={handleMouseDown}
		>
			<div className="popup__container" style={{ width: `${formWidth}` }}>
				{title && <h2 className="popup__title">{title}</h2>}
				<form className="form" name={name} onSubmit={onSubmit} noValidate>
					{children}
				</form>
				<button
					className="popup__btn-close"
					type="button"
					aria-label="Закрыть"
					onClick={onClose}
				/>
			</div>
		</div>
	);
};

export default PopupWithForm;
