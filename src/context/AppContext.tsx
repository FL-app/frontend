import { createContext, useState, useContext, ReactElement } from 'react';
import { IUserData } from '../constants/tempUserData';
import mockCurrentUser from './mock';

export const AppContext = createContext<IUserData>(mockCurrentUser);

interface AppContextProviderProps {
	children: ReactElement | ReactElement[];
}

export function AppContextProvider(props: AppContextProviderProps) {
	const { children } = props;
	const [currentUser] = useState(mockCurrentUser);

	return (
		<AppContext.Provider value={currentUser}>{children}</AppContext.Provider>
	);
}

export function useUser() {
	return useContext(AppContext);
}
