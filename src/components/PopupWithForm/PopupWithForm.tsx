import { ReactNode, MouseEvent } from 'react';
import './PopupWithForm.scss';

interface IProps {
  title?: string;
  name: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: () => void;
}

function PopupWithForm(props: IProps) {
  const { title, name, children, isOpen, onClose, onSubmit } = props;
  const handleMouseDown = (evt: MouseEvent<HTMLDivElement>) => {
    if (evt.target === evt.currentTarget) onClose();
  };

  return (
    <div
      className={`popup popup_type_${name} ${isOpen && 'popup_opened'}`}
      role="button"
      tabIndex={0}
      onKeyDown={undefined}
      onClick={handleMouseDown}
    >
      <div className="popup__container">
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
}

PopupWithForm.defaultProps = {
  title: '',
  onSubmit: undefined,
};

export default PopupWithForm;
