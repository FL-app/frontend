import './UserAvatar.scss';
import React from 'react';
import { useSelector } from 'react-redux';
import avatarMale from '../../images/icon_profile_man.png';
import avatarFemale from '../../images/icon_profile_woman.png';

function UserAvatar() {
	const userSex = useSelector((state) => state.user.gender);
	const userAvatar = useSelector((state) => state.user.avatar);

	function getUserAvatar(sex) {
		if (userAvatar !== '') {
			return userAvatar;
		}
		return sex === 'male' ? avatarMale : avatarFemale;
	}

	return (
		<img src={getUserAvatar(userSex)} alt="Аватар" className="userAvatar" />
	);
}

export default UserAvatar;
