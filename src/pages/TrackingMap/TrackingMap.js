import React, { useMemo, useState, useCallback } from "react";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";
import './TrackingMap.scss';
import geotag from '../../images/geotag_map.svg';
import { friendsLocation } from "./friendsLocation"; // TODO делать запрос к серверу для получения списка друзей, брать их координаты
import ButtonUserLocation from "../../components/ButtonUserLocation/ButtonUserLocation";

const position = [55.729348, 37.560709]; //  TODO стартовые координаты пользователя брать из редакса
const userIcon = new Icon({
  iconUrl: geotag,
  iconSize: [32, 47],
  iconAnchor: [15, 40]
})

export function TrackingMap() {
  const [map, setMap] = useState(null);

  const displayMap = useMemo(
    () => (
      <MapContainer center={position} zoom={13} scrollWheelZoom={false} ref={setMap}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker
          position={position}
          icon={userIcon} />
        {friendsLocation.map(friend => (
          <Marker
            key={friend.id}
            position={friend.position}
            icon={new Icon({
              iconUrl: friend.avatar,
              iconSize: [40, 48]
            })}
          />))
        })}
      </MapContainer>
    ), [],
  )

  const findUserLocation = useCallback(() => {
    map.setView(position);
  }, [map]);

  return (
    <>
      <Header />
      {displayMap}
      <ButtonUserLocation handleClick={ findUserLocation }/>
      <Footer />
    </>
  )
}