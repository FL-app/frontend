import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	AccessTokenDTO,
	RefreshDTO,
	TokenErrorMessage,
} from '../../constants/apiTemplate';

const refreshToken = createAsyncThunk(
	'jwt/refresh',
	async (payload: RefreshDTO) => {
		return fetch('https://flapp.sytes.net/api/v1/jwt/refresh/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(payload),
		}).then(async (response) => {
			const data = (await response.json()) as unknown;
			if (response.ok) {
				return data as AccessTokenDTO;
			}
			return data as TokenErrorMessage;
		});
	}
);

export default refreshToken;
