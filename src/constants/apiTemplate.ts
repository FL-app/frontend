const BASE_URL = 'http://91.186.197.174/api/v1';

interface IFetchBody {
	email?: string;
	username?: string;
	first_name?: string;
	last_name?: string;
	password?: string;
	gender?: string;
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

interface IFetchParam {
	path: string;
	method?: string;
	body?: IFetchBody | string;
	token?: string;
}

export const fetchTemplate = ({
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
