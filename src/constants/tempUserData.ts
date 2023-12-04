import Gender from './enums/gender';

export interface IFrend {
	id: number;
	name: string;
	sex: Gender;
	avatar: string;
	email: string;
}

export interface IUserData {
	id: number;
	name: string;
	surname: string;
	nickname: string;
	sex: Gender;
	email: string;
	avatar: string;
	status: string;
	friends: IFrend[];
}
