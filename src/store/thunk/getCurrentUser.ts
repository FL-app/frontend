import { createAsyncThunk } from '@reduxjs/toolkit';
import { getCurrentUser as getUser } from '../../untils/mianApi';
import { IUserState } from '../slices/userTypes';

const getCurrentUser = createAsyncThunk<
	Partial<IUserState>,
	string,
	{ rejectValue: string }
>('user/me', (payload: string, thunkAPI) => {
	return getUser(payload)
		.then((response: Response) => {
			if (!response.ok) throw new Error(JSON.stringify(response.json()));
			return response.json();
		})
		.catch((err: Error) => thunkAPI.rejectWithValue(err.message));
});

export default getCurrentUser;
