import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userSlice from './slices/user';
import { tokensApi } from './rtk/tokensApi';
import tokensSlice from './slices/tokens';
import { userApi } from './rtk/userApi';

const rootReducer = combineReducers({
  user: userSlice,
  tokens: tokensSlice,
  [tokensApi.reducerPath]: tokensApi.reducer,
  [userApi.reducerPath]: userApi.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(tokensApi.middleware)
      .concat(userApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
