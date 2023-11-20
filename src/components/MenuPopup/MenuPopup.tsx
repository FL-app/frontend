import './MenuPopup.scss';
import React, { ReactElement } from 'react';

interface MenuPopupProps {
	isOpen: boolean;
	onClose: () => void;
	children: ReactElement | ReactElement[];
}

const MenuPopup = (props: MenuPopupProps) => {
	const { isOpen, onClose, children } = props;

	return (
		<div
			onKeyDown={(event: React.KeyboardEvent<HTMLDivElement>) =>
				event.target === event.currentTarget && onClose
			}
			role="button"
			tabIndex={0}
			className={`menuPopup ${isOpen && 'menuPopup_opened'}`}
			onClick={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
				event.target === event.currentTarget && onClose
			}
		>
			<div className="menuPopup__container">{children}</div>
		</div>
	);
};

export default MenuPopup;
