import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Routes from '../../routes';
import { AppContextProvider } from '../../context/AppContext';
import { useRefreshTokenMutation } from '../../store/rtk/tokensApi';
import { clearStorage, readStorage } from '../../store/slices/tokens';
import { useGetUserMutation } from '../../store/rtk/userApi';
import type { AppDispatch, RootState } from '../../store';
import Loader from '../Loader/Loader';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { refresh, access } = useSelector((state: RootState) => state.tokens);
  const { isLoading } = useSelector((state: RootState) => state.user);
  const [updateToken] = useRefreshTokenMutation();
  const [getUser] = useGetUserMutation();
  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
  }

  useEffect(() => {
    if (!access) {
      dispatch(readStorage());
    } else {
      getUser(null)
        .then((data) => {
          if (isFetchBaseQueryError(data)) {
            if (refresh && access) {
              updateToken({ refresh })
                .unwrap()
                .catch(() => dispatch(clearStorage()));
            }
          }
        })
        .catch(() => {});
    }
  }, [dispatch, getUser, access, refresh, updateToken]);

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
