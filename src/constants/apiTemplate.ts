import Gender from './enums/gender';
import TokenCodes from './enums/TokenCodes';

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

export interface RegistrationDTO {
	email: string;
	nickname: string;
	name: string;
	surname: string;
	password: string;
	sex: Gender;
}

export interface RefreshDTO {
	refresh: string;
}

export interface ChangeCoordinatesDTO {
	token: string;
	id: number;
	longitude: number;
	latitude: number;
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
		| RefreshDTO
		| Partial<ChangeNicknameDTO>
		| Partial<ChangeCoordinatesDTO>;
	token?: string;
}

export interface LoginDTO {
	email: string;
	password: string;
}

export interface TokensDTO {
	access: string;
	refresh: string;
}

export interface TokenErrorMessage {
	detail: string;
	code: TokenCodes;
}

export interface AccessTokenDTO {
	access: string;
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
