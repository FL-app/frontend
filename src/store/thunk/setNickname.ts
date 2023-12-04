import { createAsyncThunk } from '@reduxjs/toolkit';
import {
	IFetchParam,
	setNickname as changeNickname,
} from '../../untils/mianApi';
import { IUserState } from '../slices/userTypes';

const setNickname = createAsyncThunk<
	Partial<IUserState>,
	IFetchParam,
	{ rejectValue: string | undefined }
>('user/me/setNickname', async (payload, thunkAPI) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const response = await changeNickname(payload);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data = await response.json();
	if (!response.ok) {
		return thunkAPI.rejectWithValue(JSON.stringify(data));
	}
	return data;
});

export default setNickname;
