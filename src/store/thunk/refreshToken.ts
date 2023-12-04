import { createAsyncThunk } from '@reduxjs/toolkit';
import { refreshToken as refresh } from '../../untils/mianApi';
import { IUserState } from '../slices/userTypes';

const refreshToken = createAsyncThunk<
	Partial<IUserState>,
	string,
	{ rejectValue: string }
>('jwt/refresh', async (payload, thunkAPI) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const response = await refresh(payload);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data = await response.json();
	if (!response.ok) {
		return thunkAPI.rejectWithValue(JSON.stringify(data));
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	localStorage.setItem('access_token', data.access);
	console.log('refreshToken');
	console.log(data);
	return data;
});

export default refreshToken;
