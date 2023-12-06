import './Welcome.scss';
import { Link } from 'react-router-dom';
import Button from '../../components/Button/Button';
import Carousel from '../../components/Carousel/Carousel';
import RoutesPath from '../../constants/enums/routesPath';

function Welcome() {
	return (
		<main className="welcome">
			<div className="welcome_container">
				<Carousel />
				<div className="welcome__button-container">
					<Link to={RoutesPath.accessAge}>
						<Button
							label="Зарегистрироваться"
							type="button"
							size="large"
							color="primary"
						/>
					</Link>
					<Link to={RoutesPath.login}>
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

export default Welcome;
