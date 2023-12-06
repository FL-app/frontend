import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser as getUser } from '../../untils/mainApi';

const getCurrentUser = createAsyncThunk(
	'user/me',
	async (payload: string, thunkAPI) => {
		try {
			const response = await getUser(payload);
			if (!response.ok) throw new Error(JSON.stringify(response.json()));
			return await response.json();
		} catch (err) {
			if (err instanceof Error) {
				return thunkAPI.rejectWithValue(err.message);
			}
			return err;
		}
	}
);

export default getCurrentUser;
