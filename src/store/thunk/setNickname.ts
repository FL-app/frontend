import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchParam, setNickname as changeNickname } from '../../untils/mianApi';
import { IUserState } from '../slices/user';

export const setNickname = createAsyncThunk<IUserState, IFetchParam, {rejectValue: string | undefined}>(
	'user/me/setNickname',
	async (payload, thunkAPI) => {
		const response = await changeNickname(payload);
		const data = await response.json();
		if (!response.ok) {
			return thunkAPI.rejectWithValue(JSON.stringify(data));
		}
		return data;
	}
);
