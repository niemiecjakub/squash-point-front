import { useParams, useNavigate } from "react-router";
import { FinishedGameColumns, leagueGameTest, scoreboardColumns } from "../../Helpers/TableColumns";
import LeagueInfo from "../../Components/LeagueInfo/LeagueInfo";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Player } from "../../Models/Player";
import { Game, GameFinished } from "../../Models/Game";
import DataTable from "react-data-table-component";
import { useLeagueStore } from "../../Context/leagueStore";
import { useQuery } from "react-query";
import { leagueGamesGetApi, leagueGetByIdApi, leaguePlayersGetApi } from "../../Services/LeagueService";
import { useEffect } from "react";
import { useAuth } from "../../Context/useAuth";

const LeaguePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { user } = useAuth();

    const { leagueGames, leaguePlayers, setGames, setPlayers, setInfo, setIsUserJoined } = useLeagueStore(
        (state) => state
    );

    const {
        data: info,
        isLoading: isLoadingInfo,
        refetch: refetchInfo,
    } = useQuery({
        queryFn: () => leagueGetByIdApi(id!),
        queryKey: ["info"],
    });

    const {
        data: players,
        isLoading: isLoadingPlayers,
        refetch: refetchPlayers,
    } = useQuery({
        queryFn: () => leaguePlayersGetApi(id!),
        queryKey: ["players"],
    });

    const {
        data: games,
        isLoading: isLoadingGames,
        refetch: refetchGames,
    } = useQuery({
        queryFn: () => leagueGamesGetApi(id!),
        queryKey: ["games"],
    });

    useEffect(() => {
        if (info?.data) {
            setInfo(info.data);
        }
    }, [info, setInfo, refetchInfo]);

    useEffect(() => {
        if (players?.data) {
            setPlayers(players.data);
            setIsUserJoined(players.data.filter((p) => p.id == user?.id).length != 0);
        }
    }, [players, setPlayers, refetchPlayers]);

    useEffect(() => {
        if (games?.data) {
            setGames(games.data);
        }
    }, [games, setGames, refetchGames]);

    const handlePlayerClick = (row: Player) => {
        navigate(`/player/${row.id}`);
    };

    const handleGameClick = (row: Game | GameFinished) => {
        navigate(`/game/${row.id}`);
    };

    return isLoadingInfo ? (
        <LoadingSpinner />
    ) : (
        <>
            <LeagueInfo leagueId={id!} refetchInfo={refetchInfo} refetchPlayers={refetchPlayers} />
            <div className="flex px-2">
                <div className="w-1/2 pr-2">
                    <DataTable
                        title="Scoreboard"
                        columns={scoreboardColumns}
                        data={leaguePlayers}
                        progressPending={isLoadingPlayers}
                        progressComponent={<LoadingSpinner />}
                        onRowClicked={handlePlayerClick}
                        pagination
                        striped
                        highlightOnHover
                        pointerOnHover
                    />
                </div>
                <div className="flex-col w-1/2 pl-2">
                    <div className="pb-2">
                        <DataTable
                            title="Live games"
                            columns={leagueGameTest}
                            data={leagueGames.liveGames}
                            progressPending={isLoadingGames}
                            progressComponent={<LoadingSpinner />}
                            onRowClicked={handleGameClick}
                            pagination
                            striped
                            highlightOnHover
                            pointerOnHover
                        />
                    </div>
                    <div className="py-2">
                        <DataTable
                            title="Upcomming games"
                            columns={leagueGameTest}
                            data={leagueGames.upcommingGames}
                            progressPending={isLoadingGames}
                            progressComponent={<LoadingSpinner />}
                            onRowClicked={handleGameClick}
                            pagination
                            striped
                            highlightOnHover
                            pointerOnHover
                        />
                    </div>
                    <div className="pt-2">
                        <DataTable
                            title="Finished games"
                            columns={FinishedGameColumns}
                            data={leagueGames.finishedGames}
                            progressPending={isLoadingGames}
                            progressComponent={<LoadingSpinner />}
                            onRowClicked={handleGameClick}
                            pagination
                            striped
                            highlightOnHover
                            pointerOnHover
                        />
                    </div>
                </div>
            </div>
        </>
    );
};

export default LeaguePage;
