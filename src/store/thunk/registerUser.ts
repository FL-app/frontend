import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchParam, register } from '../../untils/mianApi';
import { IUserState } from '../slices/user';

export const registerUser = createAsyncThunk<Partial<IUserState>, IFetchParam, {rejectValue: string}>(
	'user/register',
	async (payload, thunkAPI) => {
			const response = await register(payload);
			const data = await response.json();
			if (!response.ok) {
				return thunkAPI.rejectWithValue(JSON.stringify(data));
			}
			return data;
	}
);
