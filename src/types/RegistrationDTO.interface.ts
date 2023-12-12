import Gender from '../constants/enums/gender';

export default interface RegistrationDTO {
	email: string;
	nickname: string;
	name: string;
	surname: string;
	password: string;
	sex: Gender;
}
