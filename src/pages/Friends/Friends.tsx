import { useState } from 'react';
import { Button, PopupAddFriend } from '../../components';
import { useUser } from '../../context/AppContext';
import MainLayout from '../../layouts/MainLayout';
import './Friends.scss';

function Friends() {
	const currentUser = useUser();
	const [addFriendsPopupOpened, setAddFriendsPopupOpened] = useState(false);
	const [filteredFriends, setFilteredFriends] = useState(currentUser.friends);
	const handleSearch = (searchTerm: string) => {
		const filtered = currentUser.friends.filter((friend) =>
			friend.name.toLowerCase().includes(searchTerm.toLowerCase())
		);
		setFilteredFriends(filtered);
	};
	const handleAddFriend = () => {
		setAddFriendsPopupOpened(true);
	};
	return (
		<section className="friends">
			<div className="friends_container">
				<MainLayout
					handleSearch={() => handleSearch}
					headerClassName="friends__header"
					footerClassName="friends__footer"
				>
					<ul className="friends-list">
						{filteredFriends.map((friend) => (
							<li key={friend.id} className="friends-list__item">
								<img
									src={friend.avatar}
									alt={friend.name}
									className="friends-list__item-img"
								/>
								<span>{friend.name}</span>
							</li>
						))}
					</ul>
					<div className="friends__btn-container">
						<Button
							label="Добавить новых друзей"
							type="button"
							color="secondary"
							size="large"
							onClick={handleAddFriend}
							className="friends__add-btn"
							disabled={false}
						/>
					</div>
				</MainLayout>
				<PopupAddFriend
					isOpen={addFriendsPopupOpened}
					onClose={() => setAddFriendsPopupOpened(false)}
				/>
			</div>
		</section>
	);
}

export default Friends;
