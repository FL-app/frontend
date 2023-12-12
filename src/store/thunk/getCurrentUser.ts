import { createAsyncThunk } from '@reduxjs/toolkit';

export interface UserDTO {
	id: number;
	email: string;
	username: string;
	first_name: string;
	last_name: string;
	longitude: number;
	latitude: number;
	status: string;
	userpic: string | null;
}

const getCurrentUser = createAsyncThunk('user/me', async (token: string) => {
	try {
		const response = await fetch('https://flapp.sytes.net/api/v1/users/me', {
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${token}`,
			},
		});
		return (await response.json()) as UserDTO;
	} catch (error) {
		if (error instanceof Error) {
			return error.message;
		}
		return {} as UserDTO;
	}
});

export default getCurrentUser;
