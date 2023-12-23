import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import Routes from '../../routes';
import { AppContextProvider } from '../../context/AppContext';
import {
  useRefreshTokenMutation,
  useVerifyTokenMutation,
} from '../../store/rtk/tokensApi';
import { clearStorage, readStorage } from '../../store/slices/tokens';
import { useGetUserMutation } from '../../store/rtk/userApi';
import type { AppDispatch, RootState } from '../../store';
import Loader from '../Loader/Loader';
import { stopLoading } from '../../store/slices/user';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { refresh, access } = useSelector((state: RootState) => state.tokens);
  const { isLoading } = useSelector((state: RootState) => state.user);
  const [updateToken] = useRefreshTokenMutation();
  const [getUser] = useGetUserMutation();
  const [verifyToken] = useVerifyTokenMutation();

  function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
    return typeof error === 'object' && error != null && 'status' in error;
  }

  useEffect(() => {
    if (!access) {
      dispatch(readStorage());
      dispatch(stopLoading());
    } else {
      verifyToken(access)
        .then((verification) => {
          if (isFetchBaseQueryError(verification)) {
            if (refresh) {
              verifyToken(refresh)
                .then((refreshVerification) => {
                  if (isFetchBaseQueryError(refreshVerification)) {
                    dispatch(clearStorage());
                  } else {
                    getUser(null)
                      .then((data) => {
                        if (isFetchBaseQueryError(data)) {
                          updateToken({ refresh })
                            .unwrap()
                            .catch(() => dispatch(clearStorage()));
                        }
                      })
                      .catch(() => {});
                  }
                })
                .catch(() => {});
            }
          } else {
            getUser(null)
              .then((data) => {
                if (isFetchBaseQueryError(data)) {
                  updateToken({ refresh })
                    .unwrap()
                    .catch(() => dispatch(clearStorage()));
                }
              })
              .catch(() => {});
          }
        })
        .catch(() => {});
    }
  }, [dispatch, getUser, access, refresh, updateToken, verifyToken]);

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
