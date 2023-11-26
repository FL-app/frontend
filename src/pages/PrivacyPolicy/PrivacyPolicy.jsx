import { useNavigate } from 'react-router-dom';
import './PrivacyPolicy.scss';

export const PrivacyPolicy = () => {
	const navigate = useNavigate();

	const hadleBtnBackClick = () => {
		navigate(-1);
	};

	return (
		<section className="privacy-policy">
			<div className="privacy-policy__container">
				<div className="privacy-policy__header">
					<button
						type="button"
						className="privacy-policy__btn-back"
						onClick={hadleBtnBackClick}
						aria-label="Back"
					/>
					<h2 className="privacy-policy__title">Политика конфиденциальности</h2>
				</div>
				<p className="privacy-policy__description">
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
