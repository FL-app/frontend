import './Welcome.scss';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button.tsx';
import Carousel from '../../components/Carousel/Carousel';
import { ROUTES } from '../../constants';

export function Welcome() {
	return (
		<main className="welcome">
			<div className="welcome_container">
				<Carousel />
				<div className="welcome__button-container">
					<Link to={ROUTES.ACCESS_AGE}>
						<Button
							label="Зарегистрироваться"
							type="button"
							size="large"
							color="primary"
						/>
					</Link>
					<Link to={ROUTES.LOGIN}>
						<Button
							label="Войти"
							type="button"
							size="large"
							color="secondary"
						/>
					</Link>
				</div>
			</div>
		</main>
	);
}
