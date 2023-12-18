import Gender from '../constants/enums/gender';

export default interface RegistrationDTO {
	email: string;
	username: string;
	first_name?: string;
	last_name?: string;
	password: string;
	gender?: Gender;
}
