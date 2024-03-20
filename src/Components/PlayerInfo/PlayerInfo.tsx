import { PlayerProfileDetails } from "../../squashpoint";

type Props = {
    data: PlayerProfileDetails;
    isLoggedIn: boolean;
    isFollowing: boolean;
    handlePlayerFollow: () => void;
    handlePlayerUnfollow: () => void;
    handleFollowersClick: () => void;
    handleFollowingClick: () => void;
};

const PlayerInfo = ({
    data: { fullName, followers, following, id },
    handlePlayerFollow,
    handlePlayerUnfollow,
    handleFollowersClick,
    handleFollowingClick,
    isLoggedIn,
    isFollowing,
}: Props) => {
    return (
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

            <button className="bg-blue-200 px-4 py-2" onClick={handleFollowersClick}>
                Followers: {followers}
            </button>
            <button className="bg-blue-400 px-4 py-2" onClick={handleFollowingClick}>
                Following: {following}
            </button>
        </div>
    );
};

export default PlayerInfo;
