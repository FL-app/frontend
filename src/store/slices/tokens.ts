import { createSlice } from '@reduxjs/toolkit';
import TokensDTO from '../../types/TokensDTO.interface';

const initialState = { refresh: '', access: '11' } as TokensDTO;

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
	},
});

export default tokensSlice.reducer;
export const { readStorage } = tokensSlice.actions;
