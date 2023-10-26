const BASE_URL = 'http://91.186.197.174/api/v1';

export const fetchTemplate = ({ path, method, body, token = '' }) =>
	fetch(`${BASE_URL}${path}`, {
		method,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'application/json',
			Authorization: token,
		},
		body: JSON.stringify(body),
	});
