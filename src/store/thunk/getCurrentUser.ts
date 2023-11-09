import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser as getUser } from '../../untils/mianApi';
import { IUserState } from '../slices/user';

export const getCurrentUser = createAsyncThunk<IUserState, string, {rejectValue: string}>(
	'user/me',
	async (payload, thunkAPI) => {
		const response = await getUser(payload);
		const data = await response.json();
		console.log("data: " + data.JSON.stringify())
		if (!response.ok) {
			return thunkAPI.rejectWithValue(JSON.stringify(data));
		}
		return data;
	}
);
