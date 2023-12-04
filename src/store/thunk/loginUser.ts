import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchParam, login } from '../../untils/mianApi';

interface IReturnedData {
	access: string;
	refresh: string;
}

const loginUser = createAsyncThunk<
	IReturnedData,
	IFetchParam,
	{ rejectValue: string }
>('jwt/create', async (payload, thunkAPI) => {
	const response = await login(payload);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data = await response.json();
	if (!response.ok) {
		return thunkAPI.rejectWithValue(JSON.stringify(data));
	}
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	localStorage.setItem('access_token', data.access);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
	localStorage.setItem('refresh_token', data.refresh);
	return data;
});

export default loginUser;
