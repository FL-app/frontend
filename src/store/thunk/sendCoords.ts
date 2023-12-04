import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchParam, updateCoordinates } from '../../untils/mianApi';
import { IUserState } from '../slices/userTypes';

const sendCoords = createAsyncThunk<
	Partial<IUserState>,
	IFetchParam,
	{ rejectValue: string }
>('location/send', async (payload, thunkAPI) => {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const response = await updateCoordinates(payload);
	// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
	const data = await response.json();
	if (!response.ok) {
		return thunkAPI.rejectWithValue(JSON.stringify(data));
	}
	return data;
});

export default sendCoords;
