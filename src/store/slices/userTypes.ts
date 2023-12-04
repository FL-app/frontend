export interface IUserState {
	id: number;
	first_name: string;
	last_name: string;
	username: string;
	gender: string;
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
