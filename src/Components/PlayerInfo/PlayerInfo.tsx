import { useState } from "react";
import { playerFollowingGetApi, playerFollowersGetApi, playerFriendsGetApi } from "../../Services/PlayerService";
import Modal from "../Modal/Modal";
import PlayerBarList from "../PlayerBarList/PlayerBarList";
import Button from "../Button/Button";
import { useSoicialStore } from "../../Context/socialStore";
import { useMutation, useQuery } from "react-query";
import { usePlayerStore } from "../../Context/playerStore";
import { toast } from "react-toastify";
import {
    acceptFriendRequestApi,
    deleteFriendApi,
    followPlayerApi,
    sendFriendRequestApi,
    unfollowPlayerApi,
} from "../../Services/AccountService";
import { useUserStore } from "../../Context/userStore";

type Props = {
    playerId: string;
    isSocialInfoLoading: boolean;
    refetchInfo: () => void;
    refetchSocial: () => void;
};

const PlayerInfo = ({ playerId, refetchInfo, refetchSocial, isSocialInfoLoading }: Props) => {
    const { user } = useUserStore();
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState<boolean>(false);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState<boolean>(false);
    const [isFriendsModalOpen, setIsFriendsModalOpen] = useState<boolean>(false);

    const { playerInfo } = usePlayerStore((state) => state);
    const { isFollowing, isFriend, isFriendRequestReceived, isFriendRequestSent } = useSoicialStore((state) => state);

    const { mutateAsync: handlePlayerFollow } = useMutation({
        mutationFn: followPlayerApi,
        onSuccess: () => {
            refetchInfo();
            refetchSocial();
            toast.success(`Followed player ${playerInfo.fullName}`);
        },
    });

    const { mutateAsync: handlePlayerUnfollow } = useMutation({
        mutationFn: unfollowPlayerApi,
        onSuccess: () => {
            refetchInfo();
            refetchSocial();
            toast.info(`Unollowed player ${playerInfo.fullName}`);
        },
    });

    const { mutateAsync: handleSendFriendRequest } = useMutation({
        mutationFn: sendFriendRequestApi,
        onSuccess: () => {
            refetchInfo();
            refetchSocial();
            toast.info(`Sent friend request to ${playerInfo.fullName}`);
        },
    });

    const { mutateAsync: handleAcceptFriendRequest } = useMutation({
        mutationFn: acceptFriendRequestApi,
        onSuccess: () => {
            refetchInfo();
            refetchSocial();
            toast.info(`Accepted friend invite from ${playerInfo.fullName}`);
        },
    });

    const { mutateAsync: handleDeleteFriend } = useMutation({
        mutationFn: deleteFriendApi,
        onSuccess: () => {
            refetchInfo();
            refetchSocial();
            toast.info(`Deleted friend ${playerInfo.fullName}`);
        },
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
                                            onClick={async () => await handleDeleteFriend(playerId)}
                                        />
                                    ) : (
                                        <>
                                            {isFriendRequestReceived && (
                                                <Button
                                                    text="Accept friend request"
                                                    color="green"
                                                    onClick={async () => await handleAcceptFriendRequest(playerId)}
                                                />
                                            )}
                                            {isFriendRequestSent && (
                                                <Button
                                                    text="Friend request sent"
                                                    color="green"
                                                    onClick={async () => await handleDeleteFriend(playerId)}
                                                />
                                            )}
                                            {!isFriendRequestReceived && !isFriendRequestSent && (
                                                <Button
                                                    text="+ Add friend"
                                                    color="green"
                                                    onClick={async () => await handleSendFriendRequest(playerId)}
                                                />
                                            )}
                                        </>
                                    )}
                                    {isFollowing ? (
                                        <Button
                                            text="- Unfollow"
                                            color="red"
                                            onClick={async () => await handlePlayerUnfollow(playerId)}
                                        />
                                    ) : (
                                        <Button
                                            text="+ Follow"
                                            color="green"
                                            onClick={async () => await handlePlayerFollow(playerId)}
                                        />
                                    )}
                                </>
                            )}
                        </>
                    ) : (
                        <Button text="Log in to follow" color="red" onClick={() => {}} />
                    )}
                    <Button text={`Friends: ${playerInfo.friends}`} color="yellow" onClick={handleOpenFriendsModal} />
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
                <PlayerBarList getPlayers={() => playerFollowersGetApi(playerId)} isOpen={isFollowersModalOpen} />
            </Modal>

            <Modal
                title="Following"
                isOpen={isFollowingModalOpen}
                onClose={handleCloseFollowingModal}
                className="w-1/4 max-h-1/3"
                hasCloseBtn={true}
            >
                <PlayerBarList getPlayers={() => playerFollowingGetApi(playerId)} isOpen={isFollowingModalOpen} />
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
    );
};

export default PlayerInfo;
