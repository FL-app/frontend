import React, { useMemo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapContainer, Marker, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';
import MainLayout from '../../layouts/MainLayout';
import './TrackingMap.scss';
import geotag from '../../images/geotag_map.svg';
import { friendsLocation } from './friendsLocation'; // TODO делать запрос к серверу для получения списка друзей, брать их координаты
import ButtonUserLocation from '../../components/ButtonUserLocation/ButtonUserLocation';
import { ROUTES } from '../../constants';
import { sendCoords } from '../../store/thunk/sendCoords';

const userIcon = new Icon({
	iconUrl: geotag,
	iconSize: [32, 47],
	iconAnchor: [15, 40],
});

export function TrackingMap() {
	const [map, setMap] = useState(null);

	const location = useSelector((state) => state.location);
	const position = useMemo(
		() => [location.latitude, location.longitude],
		[location]
	);

	const { access, id } = useSelector((state) => state.user);

	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const handleSuccess = (pos) => {
			map.setView(position);
			// if (access && id !== 0) {
			if (location.isAccessAllowed) {
				if (
					location.latitude !== pos.coords.latitude ||
					location.longitude !== pos.coords.longitude
				) {
					dispatch(
						sendCoords({
							token: access,
							id,
							latitude: pos.coords.latitude,
							longitude: pos.coords.longitude,
						})
					);
				}
			} else {
				navigate(ROUTES.ACCESS_GEO);
			}
			// };
		};

		const handleError = () => {
			navigate(ROUTES.ACCESS_GEO_ERROR);
		};

		const idWatch = navigator.geolocation.watchPosition(
			handleSuccess,
			handleError
		);

		return () => {
			navigator.geolocation.clearWatch(idWatch);
		};
	}, [navigate, dispatch, location, access, id, position, map]);

	const displayMap = useMemo(
		() => (
			<MapContainer
				center={position}
				zoom={13}
				scrollWheelZoom={false}
				ref={setMap}
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
		map.setView(position);
	}, [map, position]);

	return (
		<section className="map">
			<div className="map_container">
				<MainLayout
					headerClassName="header"
					footerClassName="footer"
					handleSearch={() => void 0}
				>
					{displayMap}
					<ButtonUserLocation handleClick={findUserLocation} />
				</MainLayout>
			</div>
		</section>
	);
}
