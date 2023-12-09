import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Routes from '../../routes';
import { AppContextProvider } from '../../context/AppContext';
import getCurrentUser from '../../store/thunk/getCurrentUser';
import refreshToken from '../../store/thunk/refreshToken';
import { AppDispatch, RootState } from '../../store';
import { setLocation } from '../../store/slices/location';

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { errorMessage, isAuthenticated } = useSelector(
		(state: RootState) => state.user
	);
	const location = useSelector((state: RootState) => state.location);

	useEffect(() => {
		let token = localStorage.getItem('access_token');
		navigator.geolocation.getCurrentPosition((position) => {
			dispatch(
				setLocation({
					latitude: position.coords.latitude,
					longitude: position.coords.longitude,
				})
			);
		});
		if (token && localStorage.getItem('refresh_token')) {
			dispatch<void>(
				refreshToken({ refresh: localStorage.getItem('refresh_token') ?? '' })
			);
			token = localStorage.getItem('access_token');
			if (token) dispatch<void>(getCurrentUser(token));
		}
	}, [dispatch, errorMessage, isAuthenticated, location]);

	return (
		<AppContextProvider>
			<div className="page">
				<Routes />
			</div>
		</AppContextProvider>
	);
}

export default App;
