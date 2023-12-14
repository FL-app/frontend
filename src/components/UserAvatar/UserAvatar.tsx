import './UserAvatar.scss';
import { useSelector } from 'react-redux';
import avatarMale from '../../images/icon_profile_man.png';
import avatarFemale from '../../images/icon_profile_woman.png';
import Gender from '../../constants/enums/gender';
import RootState from '../../types/RootState';

function UserAvatar() {
	const userSex: Gender = useSelector(
		(state: RootState) => state.user.gender as Gender
	);
	const userAvatar: string | null = useSelector(
		(state: RootState) => state.user.userpic
	);

	return (
		<img
			src={userAvatar ?? userSex === Gender.male ? avatarMale : avatarFemale}
			alt="Аватар"
			className="userAvatar"
		/>
	);
}

export default UserAvatar;
