import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import Routes from '../../routes';
import { AppContextProvider } from '../../context/AppContext';
import { useRefreshTokenMutation } from '../../store/rtk/tokensApi';
import { clearStorage, readStorage } from '../../store/slices/tokens';
import AppDispatch from '../../types/AppDispatch';
import RootState from '../../types/RootState';
import { useGetUserMutation } from '../../store/rtk/userApi';
import store from '../../store';

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { refresh, access } = useSelector((state: RootState) => state.tokens);
	const [updateToken] = useRefreshTokenMutation();
	const [getUser, { isError, isLoading }] = useGetUserMutation();

	useEffect(() => {
		if (store.getState().user.requestCounter === 0 && !isLoading) {
			if (!access) {
				dispatch(readStorage());
			} else {
				getUser(access)
					.unwrap()
					.then(async () => {
						if (isError) {
							if (refresh && access) {
								await updateToken({ refresh })
									.unwrap()
									.then(async () => {
										dispatch(readStorage());
										await getUser(access).unwrap();
										if (isError) {
											dispatch(clearStorage());
										}
									});
							}
						}
					});
			}
		}
	}, [access, dispatch, getUser, isError, refresh, updateToken, isLoading]);

	return (
		<AppContextProvider>
			<div className="page">
				<Routes />
			</div>
		</AppContextProvider>
	);
}

export default App;
