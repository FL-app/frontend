import fetchTemplate, { ChangeNicknameDTO } from '../constants/apiTemplate';
import RegistrationDTO from '../types/registrationDTO.interface';
import ChangeCoordinatesDTO from '../types/ChangeCoordinatesDTO.interface';
import LoginDTO from '../types/LoginDTO.interface';

export const register = (data: RegistrationDTO) =>
	fetchTemplate({
		path: '/users/',
		method: 'POST',
		body: data,
	});

export const login = (data: LoginDTO) =>
	fetchTemplate({
		path: '/jwt/create/',
		method: 'POST',
		body: data,
	});

export const setNickname = (data: ChangeNicknameDTO) =>
	fetchTemplate({
		path: '/users/me/',
		method: 'PATCH',
		token: `Bearer ${data.token}`,
		body: {
			username: data.username,
		},
	});

export const updateCoordinates = (data: ChangeCoordinatesDTO) =>
	fetchTemplate({
		path: `/users/${data.id}/update-coordinates/`,
		method: 'PATCH',
		body: {
			longitude: data.longitude,
			latitude: data.latitude,
		},
		token: `Bearer ${data.token}`,
	});
