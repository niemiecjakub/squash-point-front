import { useState } from "react";
import { PlayerProfileDetails } from "../../squashpoint";
import SocialModal from "../SocialModal/SocialModal";
import { playerFollowingGetApi, playerFollowersGetApi } from "../../Services/PlayerService";

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
            <div className="flex justify-between text-xl my-4 mx-2">
                <h1>{fullName}</h1>
                {isLoggedIn ? (
                    <>
                        {isFollowing ? (
                            <button onClick={handlePlayerUnfollow} className="bg-red-200 px-4 py-2">
                                Unfollow
                            </button>
                        ) : (
                            <button onClick={handlePlayerFollow} className="bg-green-200 px-4 py-2">
                                Follow
                            </button>
                        )}
                    </>
                ) : (
                    <button className="bg-green-200 px-4 py-2">Log in to follow</button>
                )}

                <button className="bg-blue-200 px-4 py-2" onClick={handleOpenFollowersModal}>
                    Followers: {followers}
                </button>
                <button className="bg-blue-400 px-4 py-2" onClick={handleOpenFollowingModal}>
                    Following: {following}
                </button>
            </div>
            <SocialModal
                title="Followers"
                isOpen={isFollowersModalOpen}
                onClose={handleCloseFollowersModal}
                getPlayers={() => playerFollowersGetApi(id)}
            />

            <SocialModal
                title="Following"
                isOpen={isFollowingModalOpen}
                onClose={handleCloseFollowingModal}
                getPlayers={() => playerFollowingGetApi(id)}
            />
        </>
    );
};

export default PlayerInfo;
