import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import UserDTO from '../../types/UserDTO.interface';
import UserErrorMessage from '../../types/UserErrorMessage.interface';
import type { RootState } from '../index';
import ChangeCoordinatesDTO from '../../types/ChangeCoordinatesDTO.interface';
import Coordinates from '../../types/Coordinates.interface';

export const userApi = createApi({
	reducerPath: 'userApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://flapp.sytes.net/api/v1/users',
		prepareHeaders: (headers, { getState }) => {
			const token = (getState() as RootState).tokens.access;
			if (token) {
				headers.set('authorization', `Bearer ${token}`);
			}
			return headers;
		},
	}),
	endpoints: (builder) => ({
		getUser: builder.mutation({
			query: () => ({
				url: '/me/',
				method: 'GET',
			}),
			extraOptions: { maxRetries: 3 },
			transformResponse: (response: UserDTO) => response,
			transformErrorResponse: (response: {
				status: number;
				data?: UserErrorMessage;
			}) => response,
		}),
		updateCoordinates: builder.mutation<Coordinates, ChangeCoordinatesDTO>({
			query: (location) => ({
				url: `/${location.id}/update-coordinates/`,
				method: 'PATCH',
				body: { longitude: location.longitude, latitude: location.latitude },
			}),
		}),
	}),
});

export const { useGetUserMutation, useUpdateCoordinatesMutation } = userApi;
