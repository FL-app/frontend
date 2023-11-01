import avatarMale from '../images/icon_profile_man.png';
import avatarFemale from '../images/icon_profile_woman.png';

interface IFrend {
	id: number;
	name: string;
	sex: string;
	avatar: string;
}

interface IUserData {
	id: number;
	name: string;
	surname: string;
	nickname: string;
	sex: string;
	email: string;
	avatar: string;
	status: string;
	friends: IFrend[];
}

export const userData: IUserData = {
	id: 1,
	name: 'Екатерина',
	surname: 'Иванова',
	nickname: 'Ivanova123',
	sex: 'female',
	email: '123@mail.ru',
	avatar: '',
	status: '',
	friends: [
		{
			id: 1,
			name: 'Николай Иронов',
			sex: 'male',
			avatar: `${avatarMale}`,
		},
		{
			id: 2,
			name: 'Мария Строгих',
			sex: 'female',
			avatar: `${avatarFemale}`,
		},
		{
			id: 3,
			name: 'Анна Лейтман',
			sex: 'female',
			avatar: `${avatarFemale}`,
		},
		{
			id: 4,
			name: 'Виктор Дробыш',
			sex: 'male',
			avatar: `${avatarMale}`,
		},
	],
};
