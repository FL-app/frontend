import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import sendCoords from '../thunk/sendCoords';
import RoutesPath from '../../constants/enums/routesPath';
import LocationState from '../../types/locationState.interface';

const initialState: LocationState = {
	latitude: '',
	longitude: '',
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
			action: { payload: { latitude: string; longitude: string } }
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
				latitude: '',
				longitude: '',
				errorMessage: action.payload.errorMessage,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(sendCoords.pending, (state) => ({
			...state,
			isLoading: true,
		}));
		builder.addCase(sendCoords.fulfilled, (state, action) => ({
			...state,
			...action.payload,
			isLoading: false,
		}));
		builder.addCase(sendCoords.rejected, (state) => {
			const navigate = useNavigate();
			navigate(RoutesPath.accessGeoError);
			return {
				...state,
				isLoading: false,
				errorMessage: 'Unknown error',
			};
		});
	},
});

export default locationSlice.reducer;
export const { setLocation, setLocationError, setAccessAllowed } =
	locationSlice.actions;
