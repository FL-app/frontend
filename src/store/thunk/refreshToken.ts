import { createAsyncThunk } from '@reduxjs/toolkit';
import { refreshToken as refresh } from '../../untils/mainApi';

const refreshToken = createAsyncThunk(
	'jwt/refresh',
	async (payload: string, thunkAPI) => {
		try {
			const response = await refresh(payload);
			const data = (await response.json()) as { access: string };
			if (!response.ok) {
				throw new Error(JSON.stringify(data));
			}
			localStorage.setItem('access_token', data.access);
			return data;
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return error;
		}
	}
);

export default refreshToken;
