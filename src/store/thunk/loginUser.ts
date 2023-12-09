import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../untils/mainApi';
import { LoginDTO, TokensDTO } from '../../constants/apiTemplate';

const loginUser = createAsyncThunk(
	'jwt/create',
	async (payload: LoginDTO, thunkAPI) => {
		try {
			const response = await login(payload);
			if (!response.ok) {
				return thunkAPI.rejectWithValue(JSON.stringify(await response.json()));
			}
			const data = (await response.json()) as TokensDTO;
			if (data.access && data.refresh) {
				localStorage.setItem('access_token', data.access);
				localStorage.setItem('refresh_token', data.refresh);
			}
			return data;
		} catch (error) {
			if (error instanceof Error) {
				JSON.stringify({ detail: error.message });
			}
			return JSON.stringify({ detail: 'unknown error' });
		}
	}
);

export default loginUser;
