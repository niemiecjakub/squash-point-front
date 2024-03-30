import { useNavigate, useParams } from "react-router-dom";
import PlayerStatisticsOverviewList from "../../Components/PlayerStatisticsOverviewList/PlayerStatisticsOverviewList";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Table from "../../Components/Table/Table";
import {
    playerPageLastGamesGamesColumns,
    playerPageLeaguesColumns,
    playerPageUpcommingGamesColumns,
} from "../../Helpers/TableColumns";
import PlayerInfo from "../../Components/PlayerInfo/PlayerInfo";
import usePlayer from "../../Hooks/usePlayer";
import { League } from "../../Models/League";
import { Game, GameFinished } from "../../Models/Game";

const PlayerPage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { playerLeagues, playerGames, playerLoading, playerStatisctics } = usePlayer({ playerId: id! });

    const handleLeagueClick = (row: League): void => {
        navigate(`/league/${row.id}`);
    };

    const handleGameClick = (row: Game | GameFinished): void => {
        navigate(`/game/${row.id}`);
    };

    return playerLoading ? (
        <LoadingSpinner />
    ) : (
        <>
            <PlayerInfo playerId={id!} />
            <div className="flex-col">
                <div className="flex w-full ">
                    <Table
                        className="pb-4 mx-2 w-1/4"
                        title="Leagues"
                        data={playerLeagues}
                        loading={playerLoading}
                        onRowClicked={handleLeagueClick}
                        columns={playerPageLeaguesColumns}
                    />
                    <div className="w-full px-2 flex-col">
                        <div className="bg-white py-2 mb-4">
                            {playerGames.lastGames && playerGames.lastGames.length > 0 ? (
                                <PlayerStatisticsOverviewList statistics={playerStatisctics} />
                            ) : (
                                <p className="bg-white p-2 mb-4">No game data found</p>
                            )}
                        </div>
                        <div className="flex w-full">
                            <Table
                                title="Last Games"
                                className="pb-4 w-1/2 pr-2"
                                data={playerGames.lastGames}
                                loading={playerLoading}
                                onRowClicked={handleGameClick}
                                columns={playerPageLastGamesGamesColumns}
                            />
                            <Table
                                title="Next Games"
                                className="pb-4 w-1/2 pl-2"
                                data={playerGames.nextGames}
                                loading={playerLoading}
                                onRowClicked={handleGameClick}
                                columns={playerPageUpcommingGamesColumns}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PlayerPage;
