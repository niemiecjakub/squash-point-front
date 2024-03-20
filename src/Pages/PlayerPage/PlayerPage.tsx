import { useNavigate, useParams } from "react-router-dom";
import PlayerStatisticsOverviewList from "../../Components/PlayerStatisticsOverviewList/PlayerStatisticsOverviewList";
import { GameProfile, LeagueProfile, PlayerProfileDetails } from "../../squashpoint";
import { useEffect, useState } from "react";
import { followPlayerApi, playerGetByIdApi, unfollowPlayerApi } from "../../Services/PlayerService";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Table from "../../Components/Table/Table";
import { gamesColumns, leaguesColumns } from "../../Helpers/TableColumns";
import PlayerInfo from "../../Components/PlayerInfo/PlayerInfo";
import { useAuth } from "../../Context/useAuth";
import { toast } from "react-toastify";

const PlayerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playerData, setplayerData] = useState<PlayerProfileDetails>();
    const [playerDataLoading, setplayerDataLoading] = useState<boolean>(true);
    const [isFollowing, setIsFollowing] = useState<boolean>(false);
    const { user, socialData, getUserSocialData, isLoggedIn } = useAuth();

    useEffect(() => {
        if (user) {
            getUserSocialData(user.id);
        }
        getplayerData();
    }, []);

    useEffect(() => {
        if (socialData) {
            socialData.following.some((u) => u.id === id);
            setIsFollowing(socialData.following.some((u) => u.id === id));
        }
    }, [socialData]);

    const refreshData = async () => {
        await getplayerData();
        await getUserSocialData(user?.id!);
    };

    const getplayerData = () => {
        setplayerDataLoading(true);
        playerGetByIdApi(id!).then((res) => {
            setplayerData(res?.data!);
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
        toast.success(`You are now following ${playerData!.fullName}`);
    };

    const handlePlayerUnfollow = async () => {
        await unfollowPlayerApi(id!);
        await refreshData();
        toast.warning(`You are no longer following ${playerData!.fullName}`);
    };

    const handleFollowersClick = () => {
        // navigate()
    };

    const handleFollowingClick = () => {
        // navigate()
    };

    return (
        <>
            {playerDataLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {playerData && (
                        <>
                            <PlayerInfo
                                data={playerData}
                                isLoggedIn={isLoggedIn()}
                                isFollowing={isFollowing}
                                handlePlayerFollow={handlePlayerFollow}
                                handlePlayerUnfollow={handlePlayerUnfollow}
                                handleFollowersClick={handleFollowersClick}
                                handleFollowingClick={handleFollowingClick}
                            />
                            <div className="flex w-full">
                                <div className="flex-col w-full px-2">
                                    <Table
                                        title="Leagues"
                                        data={playerData.leagues}
                                        loading={playerDataLoading}
                                        onRowClicked={handleLeagueClick}
                                        columns={leaguesColumns}
                                    />
                                </div>
                                <div className="flex-col w-full px-2">
                                    <Table
                                        title="Games"
                                        data={playerData.games}
                                        loading={playerDataLoading}
                                        onRowClicked={handleGameClick}
                                        columns={gamesColumns}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
            <div className="w-full">
                <PlayerStatisticsOverviewList playerId={id!} />
            </div>
        </>
    );
};

export default PlayerPage;
