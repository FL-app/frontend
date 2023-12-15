import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import UserDTO from '../../types/UserDTO.interface';
import UserErrorMessage from '../../types/UserErrorMessage.interface';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://flapp.sytes.net/api/v1/users',
	}),
	endpoints: (builder) => ({
		getUser: builder.mutation<UserDTO, string>({
			query: (token: string) => ({
				url: '/me/',
				method: 'GET',
				headers: { Authorization: `Bearer ${token}` },
			}),
			extraOptions: { maxRetries: 3 },
			transformResponse: (response: UserDTO) => response,
			transformErrorResponse: (response: {
				status: number;
				data?: UserErrorMessage;
			}) => response,
		}),
	}),
});

export const { useGetUserMutation } = userApi;
