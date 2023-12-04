import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchParam, login } from '../../untils/mianApi';

interface IReturnedData {
	access: string;
	refresh: string;
}

export const loginUser = createAsyncThunk<IReturnedData, IFetchParam, {rejectValue: string}>(
	'jwt/create',
	async (payload, thunkAPI) => {
			const response = await login(payload);
			const data = await response.json();
			if (!response.ok) {
				return thunkAPI.rejectWithValue(JSON.stringify(data));
			}
			localStorage.setItem('access_token', data.access);
			localStorage.setItem('refresh_token', data.refresh);
			return data;
		}
);
