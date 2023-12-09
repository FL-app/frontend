import Gender from '../constants/enums/gender';

export default interface UserState {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	gender: Gender;
	email: string;
	userpic: string | null;
	status: string;
	isLoading: boolean;
	errorMessage: string;
	registerSuccess: boolean;
	isAuthenticated: boolean;
	access: string;
	refresh: string;
	longitude: number;
	latitude: number;
	requestCounter: number;
}
