import { createSlice } from '@reduxjs/toolkit';
import LocationState from '../../types/LocationState.interface';

const initialState: LocationState = {
	latitude: 0,
	longitude: 0,
	errorMessage: '',
	isAccessAllowed: false,
	isLoading: false,
};

const locationSlice = createSlice({
	name: 'location',
	initialState,
	reducers: {
		setAccessAllowed(state, action: { payload: boolean }) {
			return {
				...state,
				isAccessAllowed: action.payload,
			};
		},
		setLocation(
			state,
			action: { payload: { latitude: number; longitude: number } }
		) {
			return {
				...state,
				latitude: action.payload.latitude,
				longitude: action.payload.longitude,
				errorMessage: '',
			};
		},
		setLocationError(state, action: { payload: { errorMessage: string } }) {
			return {
				...state,
				latitude: 0,
				longitude: 0,
				errorMessage: action.payload.errorMessage,
			};
		},
	},
});

export default locationSlice.reducer;
export const { setLocation, setLocationError, setAccessAllowed } =
	locationSlice.actions;
