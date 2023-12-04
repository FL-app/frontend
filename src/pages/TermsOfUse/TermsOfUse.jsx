import { useNavigate } from 'react-router-dom';
import './TermsOfUse.scss';

export const TermsOfUse = () => {
	const navigate = useNavigate();

	const hadleBtnBackClick = () => {
		navigate(-1);
	};

	return (
		<section className="terms-of-use">
			<div className="terms-of-use__container">
				<div className="terms-of-use__header">
					<button
						type="button"
						className="terms-of-use__btn-back"
						onClick={hadleBtnBackClick}
						aria-label="Back"
					/>
					<h2 className="terms-of-use__title">Условия использования</h2>
				</div>
				<p className="terms-of-use__description">
					Политика конфиденциальности — это документ, описывающий, как
					организация обрабатывает и защищает личную информацию своих
					пользователей или клиентов. Она должна содержать информацию о том,
					какие данные собираются, как они используются, кто имеет доступ к этим
					данным и как они защищены от несанкционированного доступа или утечек.
				</p>
			</div>
		</section>
	);
};
