import { createSlice } from '@reduxjs/toolkit';
import loginUser from '../thunk/loginUser';
import getCurrentUser, { UserDTO } from '../thunk/getCurrentUser';
import setNickname from '../thunk/setNickname';
import Gender from '../../constants/enums/gender';
import registerUser from '../thunk/registerUser';
import UserState from '../../types/userState.interface';

const initialState: UserState = {
	id: 0,
	first_name: '',
	last_name: '',
	username: '',
	gender: Gender.male,
	email: '',
	userpic: null,
	status: '',
	isLoading: false,
	errorMessage: '',
	longitude: 0,
	latitude: 0,
	registerSuccess: false,
	isAuthenticated: false,
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
		builder.addCase(loginUser.pending, (state) => ({
			...state,
			isLoading: true,
		}));
		builder.addCase(loginUser.fulfilled, (state) => ({
			...state,
			isLoading: false,
			isAuthenticated: true,
			errorMessage: '',
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(loginUser.rejected, (state) => ({
			...state,
			isLoading: false,
			errorMessage: 'fdsfs',
			isAuthenticated: false,
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(getCurrentUser.pending, (state) => ({
			...state,
			isLoading: true,
		}));
		builder.addCase(getCurrentUser.fulfilled, (state, action) => ({
			...state,
			...(action.payload as UserDTO),
			isLoading: false,
			isAuthenticated: true,
			errorMessage: '',
			requestCounter: state.requestCounter + 1,
		}));
		builder.addCase(getCurrentUser.rejected, (state) => ({
			...state,
			isLoading: false,
			errorMessage: 'Unknown error',
			isAuthenticated: false,
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
	},
});

export default userSlice.reducer;

export const { logout } = userSlice.actions;