import { useState } from "react";
import { playerFollowingGetApi, playerFollowersGetApi, playerFriendsGetApi } from "../../Services/PlayerService";
import Modal from "../Modal/Modal";
import PlayerBarList from "../PlayerBarList/PlayerBarList";
import { useAuth } from "../../Context/useAuth";
import Button from "../Button/Button";
import usePlayer from "../../Hooks/usePlayer";
import useSocial from "../../Hooks/useSocial";

type Props = {
    playerId: string;
};

const PlayerInfo = ({ playerId }: Props) => {
    const { user } = useAuth();
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState<boolean>(false);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState<boolean>(false);
    const [isFriendsModalOpen, setIsFriendsModalOpen] = useState<boolean>(false);
    const { playerInfo, refetchData } = usePlayer({ playerId });
    const {
        isFollowing,
        isFriend,
        isFriendRequestReceived,
        isFriendRequestSent,
        handleAcceptFriendRequest,
        handleDeleteFriend,
        handlePlayerFollow,
        handlePlayerUnfollow,
        handleSendFriendRequest,
    } = useSocial({
        playerId,
        onSuccess: refetchData,
    });

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
            {playerInfo && (
                <>
                    <div className="flex justify-between items-start text-xl my-4 mx-2 p-2 bg-white rounded-t-xl">
                        <div className="flex items-start">
                            <img
                                className="h-32 w-32 rounded-full"
                                src={
                                    playerInfo.photo
                                        ? `data:image/png;base64,${playerInfo!.photo} `
                                        : `${process.env.PUBLIC_URL}` + "/player.png"
                                }
                                alt="player photo"
                            />
                            <h1 className="font-semibold text-2xl">{playerInfo.fullName}</h1>
                        </div>
                        <div className="flex">
                            {user ? (
                                <>
                                    {user.id != playerId && (
                                        <>
                                            {isFriend ? (
                                                <Button
                                                    text="- Remove friend"
                                                    color="red"
                                                    onClick={handleDeleteFriend}
                                                />
                                            ) : (
                                                <>
                                                    {isFriendRequestReceived && (
                                                        <Button
                                                            text="Accept friend request"
                                                            color="green"
                                                            onClick={handleAcceptFriendRequest}
                                                        />
                                                    )}
                                                    {isFriendRequestSent && (
                                                        <Button
                                                            text="Friend request sent"
                                                            color="green"
                                                            onClick={handleDeleteFriend}
                                                        />
                                                    )}
                                                    {!isFriendRequestReceived && !isFriendRequestSent && (
                                                        <Button
                                                            text="+ Add friend"
                                                            color="green"
                                                            onClick={handleSendFriendRequest}
                                                        />
                                                    )}
                                                </>
                                            )}
                                            {isFollowing ? (
                                                <Button text="- Unfollow" color="red" onClick={handlePlayerUnfollow} />
                                            ) : (
                                                <Button text="+ Follow" color="green" onClick={handlePlayerFollow} />
                                            )}
                                        </>
                                    )}
                                </>
                            ) : (
                                <Button text="Log in to follow" color="red" onClick={() => {}} />
                            )}
                            <Button
                                text={`Friends: ${playerInfo.friends}`}
                                color="yellow"
                                onClick={handleOpenFriendsModal}
                            />
                            <Button
                                text={`Followers: ${playerInfo.followers}`}
                                color="yellow"
                                onClick={handleOpenFollowersModal}
                            />
                            <Button
                                text={`Following: ${playerInfo.following}`}
                                color="yellow"
                                onClick={handleOpenFollowingModal}
                            />
                        </div>
                    </div>

                    <Modal
                        title="Followers"
                        isOpen={isFollowersModalOpen}
                        onClose={handleCloseFollowersModal}
                        className="w-1/4 max-h-1/3"
                        hasCloseBtn={true}
                    >
                        <PlayerBarList
                            getPlayers={() => playerFollowersGetApi(playerId)}
                            isOpen={isFollowersModalOpen}
                        />
                    </Modal>

                    <Modal
                        title="Following"
                        isOpen={isFollowingModalOpen}
                        onClose={handleCloseFollowingModal}
                        className="w-1/4 max-h-1/3"
                        hasCloseBtn={true}
                    >
                        <PlayerBarList
                            getPlayers={() => playerFollowingGetApi(playerId)}
                            isOpen={isFollowingModalOpen}
                        />
                    </Modal>

                    <Modal
                        title="Friends"
                        isOpen={isFriendsModalOpen}
                        onClose={handleCloseFriendsModal}
                        className="w-1/4 max-h-1/3"
                        hasCloseBtn={true}
                    >
                        <PlayerBarList getPlayers={() => playerFriendsGetApi(playerId)} isOpen={isFriendsModalOpen} />
                    </Modal>
                </>
            )}
        </>
    );
};

export default PlayerInfo;
