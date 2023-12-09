import { createAsyncThunk } from '@reduxjs/toolkit';
import { refreshToken as refresh } from '../../untils/mainApi';
import { RefreshDTO } from '../../constants/apiTemplate';

const refreshToken = createAsyncThunk(
	'jwt/refresh',
	async (payload: RefreshDTO, thunkAPI) => {
		try {
			const response = await refresh(payload);
			if (!response.ok) {
				return thunkAPI.rejectWithValue(JSON.stringify(response.json()));
			}
			const data = (await response.json()) as { access: string };
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
