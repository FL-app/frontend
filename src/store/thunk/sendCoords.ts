import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateCoordinates } from '../../untils/mainApi';
import ChangeCoordinatesDTO from '../../types/ChangeCoordinatesDTO.interface';

const sendCoords = createAsyncThunk(
	'location/send',
	async (payload: ChangeCoordinatesDTO, thunkAPI) => {
		try {
			const response = await updateCoordinates(payload);
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

export default sendCoords;
