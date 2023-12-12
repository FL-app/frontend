import { createAsyncThunk } from '@reduxjs/toolkit';
import { register } from '../../untils/mainApi';
import RegistrationDTO from '../../types/RegistrationDTO.interface';

const registerUser = createAsyncThunk(
	'user/register',
	async (payload: RegistrationDTO, thunkAPI) => {
		try {
			const response = await register(payload);
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

export default registerUser;
