import { useNavigate, useParams } from "react-router-dom";
import PlayerStatisticsOverviewList from "../../Components/PlayerStatisticsList/PlayerStatisticsList";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import {
    FinishedGameColumns,
    playerPageLeaguesColumns,
    playerPageUpcommingGamesColumns,
} from "../../Helpers/TableColumns";
import PlayerInfo from "../../Components/PlayerInfo/PlayerInfo";
import { League } from "../../Models/League";
import { Game, GameFinished } from "../../Models/Game";
import DataTable from "react-data-table-component";
import { useQuery } from "react-query";
import {
    getUserSocialDataApi,
    playerGamesGetByIdApi,
    playerGetByIdApi,
    playerLeaguesGetByIdApi,
} from "../../Services/PlayerService";
import { usePlayerStore } from "../../Context/playerStore";
import { useEffect } from "react";
import { useAuth } from "../../Context/useAuth";
import { useSoicialStore } from "../../Context/socialStore";

const PlayerPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();
    const { playerInfo, playerGames, playerLeagues, setGames, setLeagues, setInfo } = usePlayerStore((state) => state);

    const { setIsFollowing, setIsFriend, setIsFriendRequestReceived, setIsFriendRequestSent } = useSoicialStore(
        (state) => state
    );

    const {
        data: info,
        isLoading: isLoadingInfo,
        refetch: refetchInfo,
    } = useQuery({
        queryFn: () => playerGetByIdApi(id!),
        queryKey: ["info"],
    });

    const {
        data: socialInfo,
        isLoading: isSocialInfoLoading,
        refetch: refetchSocial,
    } = useQuery({
        queryFn: () => getUserSocialDataApi(user!.id),
        queryKey: ["social"],
    });

    const {
        data: leagues,
        isLoading: isLeaguesLoading,
        refetch: refetchLeagues,
    } = useQuery({
        queryFn: () => playerLeaguesGetByIdApi(id!),
        queryKey: ["leagues"],
    });

    const {
        data: games,
        isLoading: isGamesLoading,
        refetch: refetchGames,
    } = useQuery({
        queryFn: () => playerGamesGetByIdApi(id!),
        queryKey: ["games"],
    });

    useEffect(() => {
        if (info?.data) {
            setInfo(info.data);
        }
    }, [info, setInfo, refetchInfo]);

    useEffect(() => {
        if (leagues?.data) {
            setLeagues(leagues.data);
        }
    }, [leagues, setLeagues, refetchLeagues]);

    useEffect(() => {
        if (games?.data) {
            setGames(games.data);
        }
    }, [games, setGames, refetchGames]);

    useEffect(() => {
        if (socialInfo?.data) {
            const { following, sentFriendRequests, receivedFriendRequests, friends } = socialInfo.data;
            setIsFollowing(following.some((f) => f.id === id!));
            setIsFriend(friends.some((f) => f.id === id!));
            setIsFriendRequestSent(receivedFriendRequests.some((f) => f.id === id!));
            setIsFriendRequestReceived(sentFriendRequests.some((f) => f.id === id!));
        }
    }, [
        socialInfo,
        playerInfo,
        setInfo,
        refetchSocial,
        refetchInfo,
        setIsFollowing,
        setIsFriend,
        setIsFriendRequestSent,
        setIsFriendRequestReceived,
    ]);

    const handleLeagueClick = (row: League): void => {
        navigate(`/league/${row.id}`);
    };

    const handleGameClick = (row: Game | GameFinished): void => {
        navigate(`/game/${row.id}`);
    };

    return (
        <>
            {isLoadingInfo ? (
                <LoadingSpinner />
            ) : (
                <PlayerInfo
                    playerId={id!}
                    refetchInfo={refetchInfo}
                    refetchSocial={refetchSocial}
                    isSocialInfoLoading={isSocialInfoLoading}
                />
            )}
            <div className="flex-col">
                <div className="flex w-full ">
                    <div className="pb-4 mx-2 w-1/4">
                        <DataTable
                            title="Leagues"
                            columns={playerPageLeaguesColumns}
                            data={playerLeagues}
                            progressPending={isLeaguesLoading}
                            progressComponent={<LoadingSpinner />}
                            onRowClicked={handleLeagueClick}
                            striped
                            highlightOnHover
                            pointerOnHover
                        />
                    </div>
                    <div className="w-full px-2 flex-col">
                        <div className="bg-white py-2 mb-4">
                            {playerGames.lastGames && playerGames.lastGames.length > 0 ? (
                                <PlayerStatisticsOverviewList leagueId={id!} />
                            ) : (
                                <p className="bg-white p-2 mb-4">No game data found</p>
                            )}
                        </div>
                        <div className="flex w-full">
                            <div className="pb-4 w-1/2 pr-2">
                                <DataTable
                                    title="Last Games"
                                    columns={FinishedGameColumns}
                                    data={playerGames.lastGames}
                                    progressPending={isGamesLoading}
                                    progressComponent={<LoadingSpinner />}
                                    onRowClicked={handleGameClick}
                                    striped
                                    highlightOnHover
                                    pointerOnHover
                                />
                            </div>
                            <div className="pb-4 w-1/2 pl-2">
                                <DataTable
                                    title="Next Games"
                                    columns={playerPageUpcommingGamesColumns}
                                    data={playerGames.nextGames}
                                    progressPending={isGamesLoading}
                                    progressComponent={<LoadingSpinner />}
                                    onRowClicked={handleGameClick}
                                    striped
                                    highlightOnHover
                                    pointerOnHover
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlayerPage;
