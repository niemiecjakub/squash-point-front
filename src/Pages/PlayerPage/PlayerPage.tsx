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
    const [isFriend, setIsFriend] = useState<boolean>(false);
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
                                isFriend={isFriend}
                                handlePlayerFollow={handlePlayerFollow}
                                handlePlayerUnfollow={handlePlayerUnfollow}
                            />
                            <div className="flex-col">
                                <div className="flex w-full ">
                                    {playerData.games.length ? (
                                        <div className="w-1/3 bg-white ml-2 py-2">
                                            <PlayerStatisticsOverviewList playerId={id!} />
                                        </div>
                                    ) : (
                                        <p className="bg-white mx-2 my-4 py-4">No game data found</p>
                                    )}
                                    <div className="w-full px-2">
                                        <Table
                                            className="pb-4"
                                            title="Leagues"
                                            data={playerData.leagues}
                                            loading={playerDataLoading}
                                            onRowClicked={handleLeagueClick}
                                            columns={leaguesColumns}
                                        />
                                        <Table
                                            title="Games"
                                            data={playerData.games}
                                            loading={playerDataLoading}
                                            onRowClicked={handleGameClick}
                                            columns={gamesColumns}
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
