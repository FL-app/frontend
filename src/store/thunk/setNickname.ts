import { createAsyncThunk } from '@reduxjs/toolkit';
import { setNickname as changeNickname } from '../../untils/mianApi';

const setNickname = createAsyncThunk(
	'user/me/setNickname',
	async (payload: { username: string; token: string }, thunkAPI) => {
		try {
			const response = await changeNickname(payload);
			if (!response.ok) {
				throw new Error(JSON.stringify(response.json()));
			}
			return await response.json();
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(error.message);
			}
			return error;
		}
	}
);

export default setNickname;
