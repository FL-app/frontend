import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser as getUser } from '../../untils/mainApi';

export interface UserDTO {
	id: number;
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	longitude: number;
	latitude: number;
	status: string;
	userpic: string | null;
}

const getCurrentUser = createAsyncThunk(
	'user/me',
	async (payload: string, thunkAPI) => {
		try {
			const response = await getUser(payload);
			if (!response.ok) {
				return thunkAPI.rejectWithValue(JSON.stringify(await response.json()));
			}
			return JSON.stringify(await response.json());
		} catch (error) {
			if (error instanceof Error) {
				return thunkAPI.rejectWithValue(JSON.stringify(error));
			}
			return JSON.stringify(error);
		}
	}
);

export default getCurrentUser;
