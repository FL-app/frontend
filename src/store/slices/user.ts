import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import setNickname from '../thunk/setNickname';
import Gender from '../../constants/enums/gender';
import registerUser from '../thunk/registerUser';
import type UserState from '../../types/UserState.interface';
import { userApi } from '../rtk/userApi';
import type UserErrorMessage from '../../types/UserErrorMessage.interface';
import RoutesPath from '../../constants/enums/routesPath';

const initialState: UserState = {
	id: 0,
	first_name: '',
	last_name: '',
	username: '',
	longitude: 0,
	latitude: 0,
	gender: Gender.male,
	email: '',
	userpic: null,
	status: '',
	isLoading: false,
	errorMessage: undefined,
	registerSuccess: false,
	isAuthenticated: false,
	requestCounter: 0,
	isAccessAllowed: false,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout() {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			return {
				...initialState,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => ({
			...state,
			isLoading: true,
		}));
		builder.addCase(registerUser.fulfilled, (state) => ({
			...state,
			isLoading: false,
			registerSuccess: true,
			errorMessage: '',
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(registerUser.rejected, (state) => ({
			...state,
			isLoading: false,
			errorMessage: 'Registration unsuccessful',
			registerSuccess: false,
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(setNickname.pending, (state) => ({
			...state,
			isLoading: true,
		}));
		builder.addCase(setNickname.fulfilled, (state, action) => ({
			...state,
			...action.payload,
			isLoading: false,
			errorMessage: '',
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(setNickname.rejected, (state) => ({
			...state,
			isLoading: false,
			errorMessage: 'Something went wrong...',
			requestCounter: state.requestCounter + 1,
		}));
		builder.addMatcher(
			userApi.endpoints?.getUser.matchFulfilled,
			(state, { payload }) => ({
				...state,
				...payload,
				isAuthenticated: true,
				errorMessage: undefined,
				requestCounter: 0,
			})
		);
		builder.addMatcher(userApi.endpoints?.getUser.matchPending, (state) => ({
			...state,
			isLoading: true,
		}));
		builder.addMatcher(
			userApi.endpoints?.getUser.matchRejected,
			(state, { payload }) => ({
				...state,
				errorMessage: payload?.data as UserErrorMessage,
				isAuthenticated: false,
				requestCounter: state.requestCounter + 1,
			})
		);
		builder.addMatcher(
			userApi.endpoints?.updateCoordinates.matchFulfilled,
			(state, { payload }) => ({
				...state,
				...payload,
				errorMessage: undefined,
				isLoading: false,
				requestCounter: 0,
			})
		);
		builder.addMatcher(
			userApi.endpoints?.updateCoordinates.matchPending,
			(state) => ({
				...state,
				isLoading: true,
			})
		);
		builder.addMatcher(
			userApi.endpoints?.getUser.matchRejected,
			(state, { payload }) => {
				const navigate = useNavigate();
				navigate(RoutesPath.accessGeoError);
				return {
					...state,
					errorMessage: payload?.data as UserErrorMessage,
					isLoading: false,
					requestCounter: state.requestCounter + 1,
				};
			}
		);
	},
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;
