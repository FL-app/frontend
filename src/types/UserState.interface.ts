import Gender from '../constants/enums/gender';
import UserDTO from './UserDTO.interface';

export default interface UserState extends UserDTO {
	gender: Gender;
	isLoading: boolean;
	errorMessage: string;
	registerSuccess: boolean;
	isAuthenticated: boolean;
	requestCounter: number;
}
