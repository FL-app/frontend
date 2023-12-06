import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	setAccessAllowed,
	setLocationError,
} from '../../store/slices/location';
import { Button } from '../../components';
import RoutesPath from '../../constants/enums/routesPath';
import geoTag from '../../images/geo-tag.png';
import './AccessGeo.scss';

function AccessGeo() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const handleLocateBtnClick = () => {
		const handleSuccess = (/* position */) => {
			dispatch(setAccessAllowed(true));
			navigate(RoutesPath.map);
		};
		const handleError = (error: GeolocationPositionError) => {
			dispatch(
				setLocationError({
					errorMessage: error.message,
				})
			);
			navigate(RoutesPath.accessGeoError);
		};

		navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
	};
	return (
		<section className="access-geo">
			<div className="access-geo_container">
				<div className="access-geo_spiral" />
				<img
					src={geoTag}
					alt="geo-tag icon"
					className="access-geo_geo-tag-img"
				/>
				<h1 className="access-geo_title">
					%UserName%, где ты сейчас находишься?
				</h1>
				<h2 className="access-geo_subtitle">
					Чтобы показывать друзьям где ты находишься, предоставь приложению
					доступ к твоему местоположению
				</h2>
				<Button
					label="Определить местоположение"
					type="button"
					size="large"
					color="primary"
					className="access-geo_locate-btn"
					onClick={handleLocateBtnClick}
				/>
				<Link to={RoutesPath.accessGeoError}>
					<Button
						label="Отменить"
						type="button"
						size="large"
						color="secondary"
						className="access-geo_cancel-btn"
					/>
				</Link>
			</div>
		</section>
	);
}

export default AccessGeo;
