import { combineReducers, configureStore } from '@reduxjs/toolkit';
import locationSlice from './slices/location';
import userSlice from './slices/user';
import { tokensApi } from './rtk/tokensApi';
import tokensSlice from './slices/tokens';
import { userApi } from './rtk/userApi';

const rootReducer = combineReducers({
	location: locationSlice,
	user: userSlice,
	tokens: tokensSlice,
	[tokensApi.reducerPath]: tokensApi.reducer,
	[userApi.reducerPath]: userApi.reducer,
});

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware()
			.concat(tokensApi.middleware)
			.concat(userApi.middleware),
});

export default store;
