/* eslint-disable no-undef */
import { IFetchBody, fetchTemplate } from '../constants';

export interface IFetchParam extends IFetchBody {
	id: string
	nickname: string,
	name: string,
	surname: string,
	sex: string,
	newPassword: string,
	currentPassword: string,
	firstName: string,
	lastName: string
}

export const register = ({ email, nickname, name, surname, password, sex }: IFetchParam) =>
	fetchTemplate({
		path: '/users/',
		method: 'POST',
		body: {
			email,
			username: nickname,
			first_name: name,
			last_name: surname,
			password,
			gender: sex
		}
	});


export const login = ({ email, password }: IFetchParam) =>
	fetchTemplate({
		path: '/jwt/create/',
		method: 'POST',
		body: {
			email,
			password,
		},
	});

export const getCurrentUser = (token: string) =>
	fetchTemplate({
		path: '/users/me/',
		method: 'GET',
		token: `Bearer ${token}`,
	});

export const refreshToken = (token: string) =>
	fetchTemplate({
		path: '/jwt/refresh/',
		method: 'POST',
		body: {
			refresh: token,
		},
	});

export const verifyToken = (token: string) =>
	fetchTemplate({
		path: '/jwt/verify/',
		method: 'POST',
		body: {
			token,
		},
	});

export const getTags = () =>
	fetchTemplate({
		path: '/tags/',
		method: 'GET',
	});

export const getTagById = (id: string) =>
	fetchTemplate({
		path: `/tags/${id}/`,
		method: 'GET',
	});

export const getUsers = () =>
	fetchTemplate({
		path: '/users/',
		method: 'GET',
	});

export const getAllRequests = () =>
	fetchTemplate({
		path: '/users/all-requests/',
		method: 'GET',
	});

export const getFriends = () =>
	fetchTemplate({
		path: '/users/friends/',
		method: 'GET',
	});

export const getFriendsData = () =>
	fetchTemplate({
		path: '/users/get-friends/',
		method: 'GET',
	});

export const updateUserProfile = (userData: unknown) =>
	fetchTemplate({
		path: '/users/me/',
		method: 'PUT',
		body: JSON.stringify(userData),
	});

export const updateUserDetails = (userData: unknown) =>
	fetchTemplate({
		path: '/users/me/',
		method: 'PATCH',
		body: JSON.stringify(userData),
	});

export const deleteUserProfile = () =>
	fetchTemplate({
		path: '/users/me/',
		method: 'DELETE',
	});

export const resendActivationEmail = ({ email }: IFetchParam) =>
	fetchTemplate({
		path: '/users/resend_activation/',
		method: 'POST',
		body: { email },
	});

export const resetEmail = ({ email }: IFetchParam) =>
	fetchTemplate({
		path: '/users/reset_email/',
		method: 'POST',
		body: { email },
	});

export const confirmResetEmail = ({ email }: IFetchParam) =>
	fetchTemplate({
		path: '/users/reset_email_confirm/',
		method: 'POST',
		body: { new_email: email },
	});

export const resetPassword = ({ password }: IFetchParam) =>
	fetchTemplate({
		path: '/users/reset_password/',
		method: 'POST',
		body: {
			password,
		},
	});

export const resetPasswordConfirm = ({ uid, token, password }: IFetchParam) =>
	fetchTemplate({
		path: '/users/reset_password_confirm/',
		method: 'POST',
		body: {
			uid,
			token,
			new_password: password,
		},
	});

export const setEmail = ({ password, email }: IFetchParam) =>
	fetchTemplate({
		path: '/users/set_email/',
		method: 'POST',
		body: {
			current_password: password,
			new_email: email,
		},
	});

export const setPassword = ({ newPassword, currentPassword }: IFetchParam) =>
	fetchTemplate({
		path: '/users/set_password/',
		method: 'POST',
		body: {
			new_password: newPassword,
			current_password: currentPassword,
		},
	});

export const getUser = (id: string) =>
	fetchTemplate({
		path: `/users/${id}/`,
		method: 'GET',
	});

export const updateUser = ({
	id,
	email,
	username,
	firstName,
	lastName,
	longitude,
	latitude,
	status,
}: IFetchParam) =>
	fetchTemplate({
		path: `/users/${id}/`,
		method: 'PUT',
		body: {
			email,
			username,
			first_name: firstName,
			last_name: lastName,
			longitude,
			latitude,
			status,
		},
	});

export const updateUserDataDetails = ({
	id,
	email,
	username,
	firstName,
	lastName,
	longitude,
	latitude,
	status,
}: IFetchParam) =>
	fetchTemplate({
		path: `/users/${id}/`,
		method: 'PATCH',
		body: {
			email,
			username,
			first_name: firstName,
			last_name: lastName,
			longitude,
			latitude,
			status,
		},
	});

export const deleteUser = (id: string) =>
	fetchTemplate({
		path: `/users/${id}/`,
		method: 'DELETE',
	});

export const addFriend = ({
	id,
	email,
	username,
	firstName,
	lastName,
	longitude,
	latitude,
	status,
}: IFetchParam) =>
	fetchTemplate({
		path: `/users/${id}/add-friend/`,
		method: 'POST',
		body: {
			email,
			username,
			first_name: firstName,
			last_name: lastName,
			longitude,
			latitude,
			status,
		},
	});

export const approveUser = ({
	id,
	email,
	username,
	firstName,
	lastName,
	longitude,
	latitude,
	status,
}: IFetchParam) =>
	fetchTemplate({
		path: `/users/${id}/approved/`,
		method: 'POST',
		body: {
			email,
			username,
			first_name: firstName,
			last_name: lastName,
			longitude,
			latitude,
			status,
		},
	});

export const deleteFriend = (id: string) =>
	fetchTemplate({
		path: `/users/${id}/delete-friend/`,
		method: 'DELETE',
	});

export const deleteRequest = (id: string) =>
	fetchTemplate({
		path: `/users/${id}/delete-request/`,
		method: 'DELETE',
	});

export const updateFriendsCategory = ({
	id,
	email,
	username,
	firstName,
	lastName,
	longitude,
	latitude,
	status,
}: IFetchParam) =>
	fetchTemplate({
		path: `/users/${id}/update-friends-category/`,
		method: 'PATCH',
		body: {
			email,
			username,
			first_name: firstName,
			last_name: lastName,
			longitude,
			latitude,
			status,
		},
	});

export const updateUserPic = ({
	id,
	email,
	username,
	firstName,
	lastName,
	longitude,
	latitude,
	status,
}: IFetchParam) =>
	fetchTemplate({
		path: `/users/${id}/update-user-pic/`,
		method: 'PATCH',
		body: {
			email,
			username,
			first_name: firstName,
			last_name: lastName,
			longitude,
			latitude,
			status,
		},
	});

export const updateUserStatus = ({
	id,
	email,
	username,
	firstName,
	lastName,
	longitude,
	latitude,
	status,
}: IFetchParam) =>
	fetchTemplate({
		path: `/users/${id}/update-user-status/`,
		method: 'PATCH',
		body: {
			email,
			username,
			first_name: firstName,
			last_name: lastName,
			longitude,
			latitude,
			status,
		},
	});

export const getUserPlaces = (userId: string) =>
	fetchTemplate({
		path: `/users/${userId}/places/`,
		method: 'GET',
	});

export const createPlace = (userId: string, { name, latitude, longitude }: IFetchParam) =>
	fetchTemplate({
		path: `/users/${userId}/places/`,
		method: 'POST',
		body: {
			name,
			latitude,
			longitude,
		},
	});

export const getAllSharedPlaces = (userId: string) =>
	fetchTemplate({
		path: `/users/${userId}/places/all-shared-places/`,
		method: 'GET',
	});

export const getPlaceById = (userId: string, placeId: string) =>
	fetchTemplate({
		path: `/users/${userId}/places/${placeId}/`,
		method: 'GET',
	});

export const updatePlace = (userId: string, placeId: string, { name, latitude, longitude }:IFetchParam) =>
	fetchTemplate({
		path: `/users/${userId}/places/${placeId}/`,
		method: 'PUT',
		body: {
			name,
			latitude,
			longitude,
		},
	});

export const updatePlaceDetails = (
	userId: string,
	placeId: string,
	{ name, latitude, longitude }:IFetchParam
) =>
	fetchTemplate({
		path: `/users/${userId}/places/${placeId}/`,
		method: 'PATCH',
		body: {
			name,
			latitude,
			longitude,
		},
	});

export const deletePlace = (userId: string, placeId: string) =>
	fetchTemplate({
		path: `/users/${userId}/places/${placeId}/`,
		method: 'DELETE',
	});

export const sharePlace = (userId: string, placeId: string, { name, latitude, longitude }: IFetchParam) =>
	fetchTemplate({
		path: `/users/${userId}/places/${placeId}/share-place/`,
		method: 'POST',
		body: {
			name,
			latitude,
			longitude,
		},
	});

export const stopSharingPlace = (userId: string, placeId: string) =>
	fetchTemplate({
		path: `/users/${userId}/places/${placeId}/stop-sharing-place/`,
		method: 'DELETE',
	});

export const setNickname = ({ username, token }: IFetchParam) =>
	fetchTemplate({
		path: '/users/me/',
		method: 'PATCH',
		token: `Bearer ${token}`,
		body: {
			username,
		},
	});

export const updateCoordinates = ({ token, id, longitude, latitude }: IFetchParam) =>
	fetchTemplate({
		path: `/users/${id}/update-coordinates/`,
		method: 'PATCH',
		body: {
			longitude,
			latitude,
		},
		token: `Bearer ${token}`,
	});
