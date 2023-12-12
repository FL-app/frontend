import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Routes from '../../routes';
import { AppContextProvider } from '../../context/AppContext';
import getCurrentUser from '../../store/thunk/getCurrentUser';
import { AppDispatch, RootState } from '../../store';
import { useCreateTokenMutation } from '../../store/rtk/tokensApi';
import { readStorage } from '../../store/slices/tokens';

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const { refresh, access } = useSelector((state: RootState) => state.tokens);
	const [createToken] = useCreateTokenMutation();
	const navigate = useNavigate();

	useEffect(() => {
		if (!refresh && !access) dispatch(readStorage());
		if (refresh && access) {
			dispatch<void>(getCurrentUser(access));
		}
	}, [dispatch, access, refresh, createToken, navigate]);

	return (
		<AppContextProvider>
			<div className="page">
				<Routes />
			</div>
		</AppContextProvider>
	);
}

export default App;
