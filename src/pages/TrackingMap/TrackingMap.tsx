import { useMemo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon, LatLngExpression, Map } from 'leaflet';
import MainLayout from '../../layouts/MainLayout';
import './TrackingMap.scss';
import geotag from '../../images/geotag_map.svg';
import friendsLocation from './friendsLocation';
import RoutesPath from '../../constants/enums/routesPath';
import { AppDispatch, RootState } from '../../store';
import { useUpdateCoordinatesMutation } from '../../store/rtk/userApi';
import Loader from '../../components/Loader/Loader';

const userIcon = new Icon({
	iconUrl: geotag,
	iconSize: [32, 47],
	iconAnchor: [15, 40],
});

function TrackingMap() {
	const [map, setMap] = useState<Map>();
	const { isLoading } = useSelector((state: RootState) => state.user);
	const [updateCoordinates] = useUpdateCoordinatesMutation();
	const { id, latitude, longitude } = useSelector(
		(state: RootState) => state.user
	);
	const position = useMemo(
		() => [latitude, longitude] as LatLngExpression,
		[latitude, longitude]
	);
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();

	useEffect(() => {
		const handleSuccess = (pos: GeolocationPosition) => {
			map?.setView(position);
			if (navigator.geolocation) {
				if (
					latitude !== pos.coords.latitude ||
					longitude !== pos.coords.longitude
				) {
					updateCoordinates({
						id,
						latitude: pos.coords.latitude,
						longitude: pos.coords.longitude,
					}).unwrap();
				}
			} else {
				navigate(RoutesPath.accessGeo);
			}
		};
		const handleError = () => {
			navigate(RoutesPath.accessGeoError);
		};
		const idWatch = navigator.geolocation.watchPosition(
			handleSuccess,
			handleError
		);
		return () => {
			navigator.geolocation.clearWatch(idWatch);
		};
	}, [navigate, dispatch, id, position, map]);
	const displayMap = useMemo(
		() => (
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={false}
				ref={(mapRef) => {
					if (mapRef) setMap(mapRef);
				}}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				/>
				<Marker position={position} icon={userIcon} />
				{friendsLocation.map((friend) => (
					<Marker
						key={friend.id}
						position={friend.position}
						icon={
							new Icon({
								iconUrl: friend.avatar,
								iconSize: [40, 48],
							})
						}
					/>
				))}
			</MapContainer>
		),
		[position]
	);
	const findUserLocation = useCallback(() => {
		map?.setView(position);
	}, [map, position]);

	return isLoading ? (
		<Loader />
	) : (
		<section className="map">
			<div className="map_container">
				<MainLayout
					headerClassName="header"
					footerClassName="footer"
					handleSearch={undefined}
				>
					{displayMap}
					<button
						className="buttonUserLocation"
						type="button"
						aria-label="Мое местоположение на карте"
						onClick={findUserLocation}
					/>
				</MainLayout>
			</div>
		</section>
	);
}

export default TrackingMap;
