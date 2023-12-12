import { combineReducers, configureStore } from '@reduxjs/toolkit';
import locationSlice from './slices/location';
import userSlice from './slices/user';
import { tokensApi } from './rtk/tokensApi';
import tokensSlice from './slices/tokens';

const rootReducer = combineReducers({
	location: locationSlice,
	user: userSlice,
	tokens: tokensSlice,
	[tokensApi.reducerPath]: tokensApi.reducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(tokensApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
