import Gender from './enums/gender';
import RegistrationDTO from '../types/registrationDTO.interface';
import ChangeCoordinatesDTO from '../types/ChangeCoordinatesDTO.interface';
import RefreshTokenDTO from '../types/RefreshTokenDTO.interface';
import LoginDTO from '../types/LoginDTO.interface';

const BASE_URL = 'https://flapp.sytes.net/api/v1';

interface IFetchBody {
	email?: string;
	username?: string;
	first_name?: string;
	last_name?: string;
	password?: string;
	gender?: Gender;
	refresh?: string;
	token?: string;
	new_email?: string;
	uid?: string;
	new_password: string;
	current_password: string;
	longitude?: string;
	latitude?: string;
	status?: string;
}

export interface ChangeNicknameDTO {
	username: string;
	token: string;
}

interface IFetchParam {
	path: string;
	method?: string;
	body?:
		| IFetchBody
		| string
		| RegistrationDTO
		| LoginDTO
		| RefreshTokenDTO
		| Partial<ChangeNicknameDTO>
		| Partial<ChangeCoordinatesDTO>;
	token?: string;
}

const fetchTemplate = ({
	path,
	method,
	body,
	token = '',
}: IFetchParam): Promise<Response> =>
	fetch(`${BASE_URL}${path}`, {
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(body),
	});

export default fetchTemplate;
