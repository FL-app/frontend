import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useCallback, useEffect } from 'react';
import Routes from '../../routes';
import { AppContextProvider } from '../../context/AppContext';
import { useRefreshTokenMutation } from '../../store/rtk/tokensApi';
import { clearStorage, readStorage } from '../../store/slices/tokens';
import { useGetUserMutation } from '../../store/rtk/userApi';
import { store, AppDispatch, RootState } from '../../store';
import Loader from '../Loader/Loader';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { refresh, access } = useSelector((state: RootState) => state.tokens);
  const { isLoading } = useSelector((state: RootState) => state.user);
  const [updateToken] = useRefreshTokenMutation();
  const [getUser, { isError }] = useGetUserMutation();

  const readInitialData = useCallback(() => {
    if (!isLoading) {
      if (!access) {
        dispatch(readStorage());
      } else {
        getUser(null)
          .unwrap()
          .then(() => {
            if (isError && store.getState().user.requestCounter === 0) {
              if (refresh && access) {
                updateToken({ refresh })
                  .unwrap()
                  .catch(() => dispatch(clearStorage()));
              }
            }
          })
          .catch(() => {});
      }
    }
  }, [access, dispatch, getUser, isError, isLoading, refresh, updateToken]);

  useEffect(() => {
    readInitialData();
  }, [readInitialData]);

  return isLoading ? (
    <Loader />
  ) : (
    <AppContextProvider>
      <div className="page">
        <Routes />
      </div>
    </AppContextProvider>
  );
}

export default App;
