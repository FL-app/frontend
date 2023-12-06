import { createSlice } from '@reduxjs/toolkit';
import loginUser from '../thunk/loginUser';
import getCurrentUser from '../thunk/getCurrentUser';
import refreshToken from '../thunk/refreshToken';
import setNickname from '../thunk/setNickname';
import Gender from '../../constants/enums/gender';
import registerUser from '../thunk/registerUser';
import UserState from '../../types/userState.interface';
import { TokensDTO } from '../../constants/apiTemplate';

const initialState: UserState = {
	id: '',
	first_name: '',
	last_name: '',
	username: '',
	gender: Gender.male,
	email: '',
	avatar: '',
	status: '',
	isLoading: false,
	errorMessage: '',
	registerSuccess: false,
	isAuthenticated: false,
	access: '',
	refresh: '',
	requestCounter: 0,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout(state) {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			return {
				...state,
				isAuthenticated: false,
			};
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => ({
			...state,
			isLoading: true,
		}));
		builder.addCase(registerUser.fulfilled, (state, action) => ({
			...state,
			...action.payload,
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
		builder.addCase(loginUser.pending, (state) => ({
			...state,
			isLoading: true,
		}));
		builder.addCase(loginUser.fulfilled, (state, action) => ({
			...state,
			access: (action.payload as TokensDTO).access,
			refresh: (action.payload as TokensDTO).refresh,
			isLoading: false,
			isAuthenticated: true,
			errorMessage: '',
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(loginUser.rejected, (state, action) => ({
			...state,
			isLoading: false,
			errorMessage: action.payload as string,
			isAuthenticated: false,
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(getCurrentUser.pending, (state) => ({
			...state,
			isLoading: true,
		}));
		builder.addCase(getCurrentUser.fulfilled, (state, action) => ({
			...state,
			...action.payload,
			isLoading: false,
			isAuthenticated: true,
			errorMessage: '',
			access: localStorage.getItem('access_token'),
			refresh: localStorage.getItem('refresh_token'),
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(getCurrentUser.rejected, (state) => ({
			...state,
			isLoading: false,
			errorMessage: 'Unknown error',
			isAuthenticated: false,
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(refreshToken.pending, (state) => ({
			...state,
			isLoading: true,
		}));
		builder.addCase(refreshToken.fulfilled, (state, action) => ({
			...state,
			...JSON.parse(action.payload as string),
			isLoading: false,
			errorMessage: '',
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(refreshToken.rejected, (state) => {
			localStorage.removeItem('access_token');
			localStorage.removeItem('refresh_token');
			return {
				...state,
				isLoading: false,
				errorMessage: 'Incorrect refresh token',
				requestCounter: state.requestCounter + 1,
			};
		});
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
	},
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;
