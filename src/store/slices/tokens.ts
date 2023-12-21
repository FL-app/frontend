import { createSlice } from '@reduxjs/toolkit';
import TokensDTO from '../../types/TokensDTO.interface';
import { tokensApi } from '../rtk/tokensApi';
import AccessTokenDTO from '../../types/AccessTokenDTO.interface';

const initialState = { refresh: '', access: '' } as TokensDTO;

const tokensSlice = createSlice({
  name: 'tokens',
  initialState,
  reducers: {
    readStorage() {
      return {
        access: localStorage.getItem('access_token') ?? '',
        refresh: localStorage.getItem('refresh_token') ?? '',
      };
    },
    clearStorage() {
      localStorage.setItem('access_token', '');
      localStorage.setItem('refresh_token', '');
      return {
        access: '',
        refresh: '',
      };
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      tokensApi.endpoints?.refreshToken?.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem(
          'access_token',
          (payload as AccessTokenDTO).access,
        );
        return {
          ...state,
          ...payload,
        };
      },
    );
    builder.addMatcher(tokensApi.endpoints?.refreshToken?.matchRejected, () => {
      localStorage.setItem('access_token', '');
      localStorage.setItem('refresh_token', '');
      return { refresh: '', access: '' };
    });
    builder.addMatcher(
      tokensApi.endpoints?.createToken?.matchFulfilled,
      (state, { payload }) => {
        localStorage.setItem('access_token', payload.access);
        localStorage.setItem('refresh_token', payload.refresh);
        return {
          ...state,
          ...payload,
        };
      },
    );
  },
});

export default tokensSlice.reducer;
export const { readStorage, clearStorage } = tokensSlice.actions;
