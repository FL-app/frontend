import { createAsyncThunk } from '@reduxjs/toolkit';
import { IFetchParam, updateCoordinates } from '../../untils/mianApi';
import { IUserState } from '../slices/user';

export const sendCoords = createAsyncThunk<Partial<IUserState>, IFetchParam, {rejectValue: string}>(
	'location/send',
	async (payload, thunkAPI) => {
			const response = await updateCoordinates(payload);
			const data = await response.json();
			if (!response.ok) {
				return thunkAPI.rejectWithValue(JSON.stringify(data));
			}
			return data;
	}
);
