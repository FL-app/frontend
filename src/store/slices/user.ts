import { createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import Gender from '../../constants/enums/gender';
import type UserState from '../../types/UserState.interface';
import { userApi } from '../rtk/userApi';
import type UserErrorMessage from '../../types/UserErrorMessage.interface';
import RoutesPath from '../../constants/enums/routesPath';

const initialState: UserState = {
  id: 0,
  first_name: '',
  last_name: '',
  username: '',
  longitude: 0,
  latitude: 0,
  gender: Gender.male,
  email: '',
  userpic: null,
  status: '',
  isLoading: true,
  errorMessage: undefined,
  registerSuccess: false,
  isAuthenticated: false,
  requestCounter: 0,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout() {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      return {
        ...initialState,
      };
    },
    setLocationError(state, action: { payload: { errorMessage: string } }) {
      return {
        ...state,
        latitude: 0,
        longitude: 0,
        errorMessage: action.payload.errorMessage,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      userApi.endpoints?.getUser.matchFulfilled,
      (state, { payload }) => ({
        ...state,
        ...payload,
        isAuthenticated: true,
        isLoading: false,
        errorMessage: undefined,
        requestCounter: 0,
      }),
    );
    builder.addMatcher(userApi.endpoints?.getUser.matchPending, (state) => ({
      ...state,
      isLoading: true,
    }));
    builder.addMatcher(
      userApi.endpoints?.getUser.matchRejected,
      (state, { payload }) => ({
        ...state,
        errorMessage: payload?.data as UserErrorMessage,
        isAuthenticated: false,
        isLoading: false,
        requestCounter: state.requestCounter + 1,
      }),
    );
    builder.addMatcher(
      userApi.endpoints?.updateCoordinates.matchFulfilled,
      (state, { payload }) => ({
        ...state,
        ...payload,
        errorMessage: undefined,
        isLoading: false,
        requestCounter: 0,
      }),
    );
    builder.addMatcher(
      userApi.endpoints?.updateCoordinates.matchPending,
      (state) => ({
        ...state,
        isLoading: true,
      }),
    );
    builder.addMatcher(
      userApi.endpoints?.getUser.matchRejected,
      (state, { payload }) => {
        const navigate = useNavigate();
        navigate(RoutesPath.accessGeoError);
        return {
          ...state,
          errorMessage: payload?.data as UserErrorMessage,
          isLoading: false,
          requestCounter: state.requestCounter + 1,
        };
      },
    );
    builder.addMatcher(
      userApi.endpoints?.registerUser.matchFulfilled,
      (state, { payload }) => ({
        ...state,
        ...payload,
        isLoading: false,
        registerSuccess: true,
        errorMessage: '',
        requestCounter: 0,
      }),
    );
    builder.addMatcher(
      userApi.endpoints?.registerUser.matchPending,
      (state) => ({
        ...state,
        isLoading: true,
      }),
    );
    builder.addMatcher(
      userApi.endpoints?.updateUserInfo.matchFulfilled,
      (state, { payload }) => ({
        ...state,
        ...payload,
        isLoading: false,
        errorMessage: '',
        requestCounter: 0,
      }),
    );
    builder.addMatcher(
      userApi.endpoints?.updateUserInfo.matchPending,
      (state) => ({
        ...state,
        isLoading: true,
      }),
    );
  },
});

export default userSlice.reducer;

export const { logout, setLocationError } = userSlice.actions;
