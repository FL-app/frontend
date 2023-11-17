import { createContext, useState, useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import avatarMale from '../images/icon_profile_man.png';
import avatarFemale from '../images/icon_profile_woman.png';

export const AppContext = createContext();

// Контекст пользователя
export function AppContextProvider({ children }) {
	const [currentUser, setCurrentUser] = useState({
		firstName: 'Екатерина',
		lastName: 'Иванова',
		nickname: 'Ivanova123',
		status: '',
		sex: 'female',
		friends: [
			{
				id: 1,
				name: 'Николай Иронов',
				sex: 'male',
				avatar: `${avatarMale}`,
				email: '1@mail.ru',
			},
			{
				id: 2,
				name: 'Мария Строгих',
				sex: 'female',
				avatar: `${avatarFemale}`,
				email: '2@mail.ru',
			},
			{
				id: 3,
				name: 'Анна Лейтман',
				sex: 'female',
				avatar: `${avatarFemale}`,
				email: '3@mail.ru',
			},
			{
				id: 4,
				name: 'Виктор Дробыш',
				sex: 'male',
				avatar: `${avatarMale}`,
				email: '4@mail.ru',
			},
		],
	});

	const contextValue = useMemo(
		() => ({ currentUser, setCurrentUser }),
		[currentUser, setCurrentUser]
	);

	return (
		<AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
	);
}

// Хук для получения текущего пользователя и функции для его изменения
export function useUser() {
	const { currentUser, setCurrentUser } = useContext(AppContext);
	return { currentUser, setCurrentUser };
}

AppContextProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
