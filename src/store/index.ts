import { combineReducers, configureStore } from '@reduxjs/toolkit';
import locationSlice from './slices/location';
import userSlice from './slices/user';

const rootReducer = combineReducers({
	location: locationSlice,
	user: userSlice,
});

const store = configureStore({
	reducer: rootReducer,
});

export default store;
