import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import TokensDTO from '../../types/TokensDTO.interface';
import LoginDTO from '../../types/LoginDTO.interface';
import RefreshTokenDTO from '../../types/RefreshTokenDTO.interface';
import TokenErrorMessage from '../../types/TokenErrorMessage.interface';
import AccessTokenDTO from '../../types/AccessTokenDTO.interface';

export const tokensApi = createApi({
	reducerPath: 'tokensApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'https://flapp.sytes.net/api/v1/jwt' }),
	endpoints: (builder) => ({
		createToken: builder.mutation<TokensDTO, LoginDTO>({
			query: (body: LoginDTO) => ({
				url: '/create/',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body,
			}),
			transformResponse: (response: Promise<TokensDTO>): Promise<TokensDTO> =>
				response,
			transformErrorResponse: (response: {
				status: number;
				data: TokenErrorMessage;
			}) => response.data.detail,
		}),
		refreshToken: builder.mutation<
			AccessTokenDTO | TokenErrorMessage,
			RefreshTokenDTO
		>({
			query: (body: RefreshTokenDTO) => ({
				url: '/refresh/',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body,
			}),
			transformResponse: (response: AccessTokenDTO) => response,
			transformErrorResponse: (response: {
				status: number;
				data: TokenErrorMessage;
			}) => response.data,
		}),
		verifyToken: builder.mutation({
			query: (body: string) => ({
				url: '/verify/',
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body,
			}),
		}),
	}),
});

export const { useCreateTokenMutation, useRefreshTokenMutation } = tokensApi;
