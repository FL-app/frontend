import avatarMale from '../images/icon_profile_man.png';
import avatarFemale from '../images/icon_profile_woman.png';
import { IUserData } from '../constants/tempUserData';
import Gender from '../constants/enums/gender';

const mockCurrentUser: IUserData = {
  id: 1500,
  name: 'Екатерина',
  surname: 'Иванова',
  nickname: 'Ivanova123',
  status: '',
  sex: Gender.female,
  email: 'mail@mail.com',
  avatar: avatarFemale,
  friends: [
    {
      id: 1,
      name: 'Николай Иронов',
      sex: Gender.male,
      avatar: `${avatarMale}`,
      email: '1@mail.ru',
    },
    {
      id: 2,
      name: 'Мария Строгих',
      sex: Gender.female,
      avatar: `${avatarFemale}`,
      email: '2@mail.ru',
    },
    {
      id: 3,
      name: 'Анна Лейтман',
      sex: Gender.female,
      avatar: `${avatarFemale}`,
      email: '3@mail.ru',
    },
    {
      id: 4,
      name: 'Виктор Дробыш',
      sex: Gender.male,
      avatar: `${avatarMale}`,
      email: '4@mail.ru',
    },
  ],
};

export default mockCurrentUser;
