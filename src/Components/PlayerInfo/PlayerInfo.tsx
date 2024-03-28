import { useState } from "react";
import { PlayerProfileDetails } from "../../squashpoint";
import { playerFollowingGetApi, playerFollowersGetApi, playerFriendsGetApi } from "../../Services/PlayerService";
import Modal from "../Modal/Modal";
import PlayerBarList from "../PlayerBarList/PlayerBarList";
import { useAuth } from "../../Context/useAuth";

type Props = {
    playerInfo: PlayerProfileDetails;
    isLoggedIn: boolean;
    isFollowing: boolean;
    isFriend: boolean;
    isFriendRequestSent: boolean;
    isFriendRequestReceived: boolean;
    handlePlayerFollow: () => void;
    handlePlayerUnfollow: () => void;
    handleSendFriendRequest: () => void;
    handleAcceptFriendRequest: () => void;
    handleDeleteFriend: () => void;
};

const PlayerInfo = ({
    playerInfo: { fullName, friends, followers, following, id, photo },
    handlePlayerFollow,
    handlePlayerUnfollow,
    handleSendFriendRequest,
    handleAcceptFriendRequest,
    handleDeleteFriend,
    isFriend,
    isLoggedIn,
    isFollowing,
    isFriendRequestSent,
    isFriendRequestReceived,
}: Props) => {
    const { user } = useAuth();
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState<boolean>(false);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState<boolean>(false);
    const [isFriendsModalOpen, setIsFriendsModalOpen] = useState<boolean>(false);

    const handleOpenFollowingModal = () => {
        setIsFollowingModalOpen(true);
    };

    const handleCloseFollowingModal = () => {
        setIsFollowingModalOpen(false);
    };

    const handleOpenFollowersModal = () => {
        setIsFollowersModalOpen(true);
    };

    const handleCloseFollowersModal = () => {
        setIsFollowersModalOpen(false);
    };

    const handleOpenFriendsModal = () => {
        setIsFriendsModalOpen(true);
    };

    const handleCloseFriendsModal = () => {
        setIsFriendsModalOpen(false);
    };

    return (
        <>
            <div className="flex justify-between items-start text-xl my-4 mx-2 p-2 bg-white rounded-t-xl">
                <div className="flex items-start">
                    <img
                        className="h-32 w-32 rounded-full"
                        src={photo ? `data:image/png;base64,${photo} ` : `${process.env.PUBLIC_URL}` + "/player.png"}
                        alt="player photo"
                    />
                    <h1 className="font-semibold text-2xl">{fullName}</h1>
                </div>
                <div className="flex">
                    {isLoggedIn && user ? (
                        <>
                            {user.id != id && (
                                <>
                                    {isFriend ? (
                                        <button
                                            className="bg-red-200 px-4 py-2 mx-2 rounded-full"
                                            onClick={handleDeleteFriend}
                                        >
                                            - Remove friend
                                        </button>
                                    ) : (
                                        <>
                                            {isFriendRequestReceived && (
                                                <button
                                                    className="bg-green-200 px-4 py-2 mx-2 rounded-full"
                                                    onClick={handleAcceptFriendRequest}
                                                >
                                                    Accept friend request
                                                </button>
                                            )}
                                            {isFriendRequestSent && (
                                                <button
                                                    className="bg-yellow-200 px-4 py-2 mx-2 rounded-full"
                                                    onClick={handleDeleteFriend}
                                                >
                                                    Friend request sent // click to remove
                                                </button>
                                            )}
                                            {!isFriendRequestReceived && !isFriendRequestSent && (
                                                <button
                                                    className="bg-green-200 px-4 py-2 mx-2 rounded-full"
                                                    onClick={handleSendFriendRequest}
                                                >
                                                    + Add friend
                                                </button>
                                            )}
                                        </>
                                    )}
                                    {isFollowing ? (
                                        <button
                                            onClick={handlePlayerUnfollow}
                                            className="bg-red-200 px-4 py-2 mx-2 rounded-full"
                                        >
                                            - Unfollow
                                        </button>
                                    ) : (
                                        <button
                                            onClick={handlePlayerFollow}
                                            className="bg-green-200 px-4 py-2 mx-2 rounded-full"
                                        >
                                            + Follow
                                        </button>
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <button className="bg-green-200 px-4 py-2 mx-2 rounded-full">Log in to follow</button>
                    )}

                    <button className="bg-yellow-200 px-4 py-2 rounded-full mx-2" onClick={handleOpenFriendsModal}>
                        Friends: {friends}
                    </button>
                    <button className="bg-blue-200 px-4 py-2 rounded-full mx-2" onClick={handleOpenFollowersModal}>
                        Followers: {followers}
                    </button>
                    <button className="bg-blue-400 px-4 py-2 rounded-full mx-2" onClick={handleOpenFollowingModal}>
                        Following: {following}
                    </button>
                </div>
            </div>

            <Modal
                title="Followers"
                isOpen={isFollowersModalOpen}
                onClose={handleCloseFollowersModal}
                className="w-1/4 max-h-1/3"
                hasCloseBtn={true}
            >
                <PlayerBarList getPlayers={() => playerFollowersGetApi(id)} isOpen={isFollowersModalOpen} />
            </Modal>

            <Modal
                title="Following"
                isOpen={isFollowingModalOpen}
                onClose={handleCloseFollowingModal}
                className="w-1/4 max-h-1/3"
                hasCloseBtn={true}
            >
                <PlayerBarList getPlayers={() => playerFollowingGetApi(id)} isOpen={isFollowingModalOpen} />
            </Modal>

            <Modal
                title="Friends"
                isOpen={isFriendsModalOpen}
                onClose={handleCloseFriendsModal}
                className="w-1/4 max-h-1/3"
                hasCloseBtn={true}
            >
                <PlayerBarList getPlayers={() => playerFriendsGetApi(id)} isOpen={isFriendsModalOpen} />
            </Modal>
        </>
    );
};

export default PlayerInfo;
