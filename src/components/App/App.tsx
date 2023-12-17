import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Routes from '../../routes';
import { AppContextProvider } from '../../context/AppContext';
import { useRefreshTokenMutation } from '../../store/rtk/tokensApi';
import { clearStorage, readStorage } from '../../store/slices/tokens';
import { useGetUserMutation } from '../../store/rtk/userApi';
import { store, AppDispatch, RootState } from '../../store';

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { refresh, access } = useSelector((state: RootState) => state.tokens);
	const [updateToken] = useRefreshTokenMutation();
	const [getUser, { isError, isLoading }] = useGetUserMutation();

	useEffect(() => {
		if (!isLoading) {
			if (!access) {
				dispatch(readStorage());
			} else {
				getUser(access)
					.unwrap()
					.then(() => {
						if (isError && store.getState().user.requestCounter === 0) {
							if (refresh && access) {
								updateToken({ refresh })
									.unwrap()
									.catch(() => dispatch(clearStorage()));
							}
						}
					});
			}
		}
	}, [access, dispatch, refresh, updateToken]);

	return (
		<AppContextProvider>
			<div className="page">
				<Routes />
			</div>
		</AppContextProvider>
	);
}

export default App;
