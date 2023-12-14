import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { UserDTO } from '../thunk/getCurrentUser';

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
			transformResponse: (response: Promise<UserDTO>) => response,
			transformErrorResponse: (response) => response,
		}),
	}),
});

export const { useGetUserMutation } = userApi;
