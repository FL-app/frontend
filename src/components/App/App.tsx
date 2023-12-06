import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Routes from '../../routes';
import { AppContextProvider } from '../../context/AppContext';
import getCurrentUser from '../../store/thunk/getCurrentUser';
import refreshToken from '../../store/thunk/refreshToken';
import TokenErrorMessage from '../../types/tokenErrorMessage';
import TokenCodes from '../../constants/enums/TokenCodes';
import { AppDispatch, RootState } from '../../store';

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { errorMessage, isAuthenticated } = useSelector(
		(state: RootState) => state.user
	);

	useEffect(() => {
		let token = localStorage.getItem('access_token');
		if (token) dispatch<void>(getCurrentUser(token));
		if (errorMessage) {
			const error = JSON.parse(errorMessage) as TokenErrorMessage;
			if (error.code === TokenCodes.notValid) {
				token = localStorage.getItem('refresh_token');
				if (token) dispatch<void>(refreshToken(token));
			}
		}
	}, [dispatch, errorMessage, isAuthenticated]);

	return (
		<AppContextProvider>
			<div className="page">
				<Routes />
			</div>
		</AppContextProvider>
	);
}

export default App;
