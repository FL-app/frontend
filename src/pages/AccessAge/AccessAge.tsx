import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, PopupWithForm } from '../../components';
import RoutesPath from '../../constants/enums/routesPath';
import './AccessAge.scss';

export default function AccessAge() {
	const navigate = useNavigate();
	const [tooYoungPopupOpened, setTooYoungPopupOpened] = useState(false);

	return (
		<section className="access-age">
			<div className="access-age_container">
				<div className="access-age_cylinder" />
				<h1 className="access-age_title">Привет! Тебе уже есть 18 лет?</h1>
				<h2 className="access-age_subtitle">Только честно</h2>
				<Link to={RoutesPath.registration}>
					<Button
						label="Да"
						type="button"
						size="large"
						color="primary"
						className="access-age_yes-btn"
					/>
				</Link>
				<Button
					label="Нет, мне меньше 18 лет"
					type="button"
					size="large"
					color="secondary"
					className="access-age_no-btn"
					onClick={() => {
						setTooYoungPopupOpened(true);
					}}
				/>
				<PopupWithForm
					name="too-young"
					isOpen={tooYoungPopupOpened}
					onClose={() => setTooYoungPopupOpened(false)}
					onSubmit={undefined}
				>
					<div className="access-age_popup-container">
						<p className="access-age_popup-container_title">
							Сервис предназначен для пользователей, достигших 18-летнего
							возраста. Подробнее в{' '}
							<Link
								to={RoutesPath.termsOfUse}
								className="access-age_popup-container_title_terms-of-use-link"
								target="_blank"
							>
								условиях пользовательского соглашения
							</Link>
						</p>
						<Button
							label="Понятно"
							type="button"
							size="medium"
							color="primary"
							className="access-age_popup-container_btn-ok"
							onClick={() => {
								setTooYoungPopupOpened(false);
								navigate(RoutesPath.root);
							}}
						/>
					</div>
				</PopupWithForm>
			</div>
		</section>
	);
}
