import { createAsyncThunk } from '@reduxjs/toolkit';
import { refreshToken as refresh } from '../../untils/mianApi';
import { IUserState } from '../slices/user';

export const refreshToken = createAsyncThunk<Partial<IUserState>, string, {rejectValue: string}>(
	'jwt/refresh',
	async (payload, thunkAPI) => {
			const response = await refresh(payload);
			const data = await response.json();
			if (!response.ok) {
				return thunkAPI.rejectWithValue(JSON.stringify(data));
			}
			localStorage.setItem('access_token', data.access);
			console.log("refreshToken")
			console.log(data)
			return data;
	}
);
