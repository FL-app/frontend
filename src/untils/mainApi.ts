import fetchTemplate from '../constants/apiTemplate';
import RegistrationDTO from '../types/RegistrationDTO.interface';
import ChangeNicknameDTO from '../types/ChangeNicknameDTO.interface';

export const register = (data: RegistrationDTO) =>
	fetchTemplate({
		path: '/users/',
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
