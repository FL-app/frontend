import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import sendCoords from '../thunk/sendCoords';
import RoutesPath from '../../constants/enums/routesPath';

const initialState = {
	latitude: '',
	longitude: '',
	errorMessage: '',
	isAccessAllowed: false,
	isLoading: false,
};

const locationSlice = createSlice({
	name: 'location',
	initialState: initialState,
	reducers: {
		setAccessAllowed(state, action) {
			return {
				...state,
				isAccessAllowed: action.payload,
			};
		},
		setLocation(state, action) {
			return {
				...state,
				latitude: action.payload.latitude,
				longitude: action.payload.longitude,
				errorMessage: '',
			};
		},
		setLocationError(state, action) {
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
		builder.addCase(sendCoords.rejected, (state, action) => {
			const navigate = useNavigate();
			navigate(RoutesPath.accessGeoError);

			return {
				...state,
				isLoading: false,
				errorMessage: action.payload,
			};
		});
	},
});

export default locationSlice.reducer;
export const { setLocation, setLocationError, setAccessAllowed } =
	locationSlice.actions;
