import { useNavigate, useParams } from "react-router-dom";
import PlayerStatisticsOverviewList from "../../Components/PlayerStatisticsOverviewList/PlayerStatisticsOverviewList";
import { GameProfile, LeagueProfile, PlayerProfileDetails } from "../../squashpoint";
import { useEffect, useState } from "react";
import { playerGetByIdApi } from "../../Services/PlayerService";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Table from "../../Components/Table/Table";
import {
    playerPageLastGamesColumns,
    playerPageLeaguesColumns,
    playerPageNextGamesColumns,
} from "../../Helpers/TableColumns";
import PlayerInfo from "../../Components/PlayerInfo/PlayerInfo";
import { useAuth } from "../../Context/useAuth";
import { toast } from "react-toastify";
import {
    acceptFriendRequestApi,
    deleteFriendApi,
    followPlayerApi,
    sendFriendRequestApi,
    unfollowPlayerApi,
} from "../../Services/AccountService";

const PlayerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playerInfo, setPlayerInfo] = useState<PlayerProfileDetails>();
    const [playerDataLoading, setplayerDataLoading] = useState<boolean>(true);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const [isFriend, setIsFriend] = useState<boolean>(false);
    const [isFriendRequestSent, setIsFriendRequestSent] = useState<boolean>(false);
    const [isFriendRequestReceived, setIsFriendRequestReceived] = useState<boolean>(false);
    const { user, socialData, getUserSocialData, isLoggedIn } = useAuth();

    useEffect(() => {
        if (user) {
            getUserSocialData(user.id);
        }
        getplayerData();
    }, []);

    useEffect(() => {
        if (socialData) {
            setIsFollowing(socialData.following.some((u) => u.id === id));
            setIsFriend(socialData.friends.some((u) => u.id === id));
            setIsFriendRequestSent(socialData.sentFriendRequests.some((u) => u.id === id));
            setIsFriendRequestReceived(socialData.receivedFriendRequests.some((u) => u.id === id));
        }
    }, [socialData]);

    const refreshData = async () => {
        await getplayerData();
        await getUserSocialData(user?.id!);
    };

    const getplayerData = () => {
        setplayerDataLoading(true);
        playerGetByIdApi(id!).then((res) => {
            setPlayerInfo(res?.data!);
        });
        setplayerDataLoading(false);
    };

    const handleLeagueClick = (row: LeagueProfile): void => {
        navigate(`/league/${row.id}`);
    };

    const handleGameClick = (row: GameProfile): void => {
        navigate(`/game/${row.id}`);
    };

    const handlePlayerFollow = async () => {
        await followPlayerApi(id!);
        await refreshData();
        toast.success(`You are now following ${playerInfo!.fullName}`);
    };

    const handlePlayerUnfollow = async () => {
        await unfollowPlayerApi(id!);
        await refreshData();
        toast.warning(`You are no longer following ${playerInfo!.fullName}`);
    };

    const handleSendFriendRequest = async () => {
        await sendFriendRequestApi(id!);
        await refreshData();
        toast.success(`Friend request sent to ${playerInfo!.fullName}`);
    };

    const handleAcceptFriendRequest = async () => {
        await acceptFriendRequestApi(id!);
        await refreshData();
        toast.success(`You are now friends with ${playerInfo!.fullName}`);
    };

    const handleDeleteFriend = async () => {
        await deleteFriendApi(id!);
        await refreshData();
        toast.info(`${playerInfo!.fullName} removed from friend list`);
    };

    return (
        <>
            {playerDataLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {playerInfo && (
                        <>
                            <PlayerInfo
                                playerInfo={playerInfo}
                                isLoggedIn={isLoggedIn()}
                                isFollowing={isFollowing}
                                isFriend={isFriend}
                                isFriendRequestReceived={isFriendRequestReceived}
                                isFriendRequestSent={isFriendRequestSent}
                                handlePlayerFollow={handlePlayerFollow}
                                handlePlayerUnfollow={handlePlayerUnfollow}
                                handleSendFriendRequest={handleSendFriendRequest}
                                handleAcceptFriendRequest={handleAcceptFriendRequest}
                                handleDeleteFriend={handleDeleteFriend}
                            />
                            <div className="flex-col">
                                <div className="flex w-full ">
                                    <Table
                                        className="pb-4 mx-2 w-1/3"
                                        title="Leagues"
                                        data={playerInfo.leagues}
                                        loading={playerDataLoading}
                                        onRowClicked={handleLeagueClick}
                                        columns={playerPageLeaguesColumns}
                                    />
                                    <div className="w-full px-2">
                                        {playerInfo.lastGames.length ? (
                                            <div className="bg-white py-2 mb-4">
                                                <PlayerStatisticsOverviewList playerId={id!} />
                                            </div>
                                        ) : (
                                            <p className="bg-white mx-2 my-4 py-4">No game data found</p>
                                        )}
                                        <Table
                                            title="Last Games"
                                            className="pb-4"
                                            data={playerInfo.lastGames}
                                            loading={playerDataLoading}
                                            onRowClicked={handleGameClick}
                                            columns={playerPageLastGamesColumns}
                                        />
                                        <Table
                                            title="Next Games"
                                            className="pb-4"
                                            data={playerInfo.nextGames}
                                            loading={playerDataLoading}
                                            onRowClicked={handleGameClick}
                                            columns={playerPageNextGamesColumns}
                                        />
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default PlayerPage;
