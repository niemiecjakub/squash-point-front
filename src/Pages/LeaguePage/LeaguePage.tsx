import { useParams, useNavigate } from "react-router";
import Table from "../../Components/Table/Table";
import { leagueGameTest, playerPageLastGamesGamesColumns, scoreboardColumns } from "../../Helpers/TableColumns";
import LeagueInfo from "../../Components/LeagueInfo/LeagueInfo";
import useLeague from "../../Hooks/useLeague";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import { Player } from "../../Models/Player";
import { Game } from "../../Models/Game";

const LeaguePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { leagueLoading, leaguePlayers, leagueGames } = useLeague({ leagueId: id! });

    const handlePlayerClick = (row: Player) => {
        navigate(`/player/${row.id}`);
    };

    const handleGameClick = (row: Game) => {
        navigate(`/game/${row.id}`);
    };

    return leagueLoading ? (
        <LoadingSpinner />
    ) : (
        <>
            <LeagueInfo leagueId={id!} />
            <div className="flex px-2">
                <Table
                    className="w-1/2 pr-2"
                    title="Scoreboard"
                    loading={leagueLoading}
                    data={leaguePlayers}
                    columns={scoreboardColumns}
                    onRowClicked={handlePlayerClick}
                    pagination={true}
                />
                <div className="flex-col w-1/2 pl-2">
                    <Table
                        className="pb-2"
                        title="Live games"
                        loading={leagueLoading}
                        data={leagueGames.liveGames}
                        columns={leagueGameTest}
                        onRowClicked={handleGameClick}
                        pagination={true}
                    />
                    <Table
                        className="py-2"
                        title="Upcomming games"
                        loading={leagueLoading}
                        data={leagueGames.upcommingGames}
                        columns={leagueGameTest}
                        onRowClicked={handleGameClick}
                        pagination={true}
                    />
                    <Table
                        className="py-2"
                        title="Finished games"
                        loading={leagueLoading}
                        data={leagueGames.finishedGames}
                        columns={playerPageLastGamesGamesColumns}
                        onRowClicked={handleGameClick}
                        pagination={true}
                    />
                </div>
            </div>
        </>
    );
};

export default LeaguePage;
