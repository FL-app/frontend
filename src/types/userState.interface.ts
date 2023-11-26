import Gender from '../constants/enums/gender';

export default interface UserState {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	gender: Gender;
	email: string;
	avatar: string;
	status: string;
	isLoading: boolean;
	errorMessage: string;
	registerSuccess: boolean;
	isAuthenticated: boolean;
	access: string;
	refresh: string;
	requestCounter: number;
}
