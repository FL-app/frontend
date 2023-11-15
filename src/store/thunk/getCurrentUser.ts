import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser as getUser } from '../../untils/mianApi';

export const getCurrentUser = createAsyncThunk(
	'user/me',
	async (payload: string, thunkAPI) => {
		return getUser(payload)
			.then((response: Response) => {
				if (!response.ok) throw new Error(JSON.stringify(response.json()));
				return response.json();
			})
			.catch((err: Error) => thunkAPI.rejectWithValue(err.message));
	}
);
