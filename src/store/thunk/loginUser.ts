import { createAsyncThunk } from '@reduxjs/toolkit';
import { login } from '../../untils/mainApi';

const loginUser = createAsyncThunk(
	'jwt/create',
	async (payload: { email: string; password: string }, thunkAPI) => {
		try {
			const response = await login(payload);
			if (!response.ok) {
				throw new Error(JSON.stringify(response.json()));
			}
			const data = (await response.json()) as {
				access: string;
				refresh: string;
			};
			localStorage.setItem('access_token', data.access);
			localStorage.setItem('refresh_token', data.refresh);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return error;
		}
	}
);

export default loginUser;
