import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchParam, register } from '../../untils/mianApi';
import { IUserState } from '../slices/userTypes';

const registerUser = createAsyncThunk<
	Partial<IUserState>,
	IFetchParam,
	{ rejectValue: string }
>('user/register', async (payload, thunkAPI) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const response = await register(payload);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data = await response.json();
	if (!response.ok) {
		return thunkAPI.rejectWithValue(JSON.stringify(data));
	}
	return data;
});

export default registerUser;
