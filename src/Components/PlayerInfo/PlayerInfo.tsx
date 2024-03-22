import { useState } from "react";
import { PlayerProfileDetails } from "../../squashpoint";
import SocialModal from "../PlayerBarList/PlayerBarList";
import { playerFollowingGetApi, playerFollowersGetApi } from "../../Services/PlayerService";
import Modal from "../Modal/Modal";
import PlayerBarList from "../PlayerBarList/PlayerBarList";
import { useAuth } from "../../Context/useAuth";

type Props = {
    data: PlayerProfileDetails;
    isLoggedIn: boolean;
    isFollowing: boolean;
    handlePlayerFollow: () => void;
    handlePlayerUnfollow: () => void;
};

const PlayerInfo = ({
    data: { fullName, followers, following, id },
    handlePlayerFollow,
    handlePlayerUnfollow,
    isLoggedIn,
    isFollowing,
}: Props) => {
    const { user } = useAuth();
    const [isFollowingModalOpen, setIsFollowingModalOpen] = useState<boolean>(false);
    const [isFollowersModalOpen, setIsFollowersModalOpen] = useState<boolean>(false);

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

    return (
        <>
            <div className="flex justify-between items-center text-xl my-4 mx-2 p-2 bg-white rounded-t-xl">
                <h1 className="font-semibold text-2xl">{fullName}</h1>
                <div className="flex">
                    {isLoggedIn && user ? (
                        <>
                            {user.id != id && (
                                <>
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
        </>
    );
};

export default PlayerInfo;
