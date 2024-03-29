import { useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Table from "../../Components/Table/Table";
import { GameProfile, PlayerProfile } from "../../squashpoint";
import { useAuth } from "../../Context/useAuth";
import { leagueGameTest, playerPageLastGamesGamesColumns, scoreboardColumns } from "../../Helpers/TableColumns";
import LeagueInfo from "../../Components/LeagueInfo/LeagueInfo";
import useLeague from "../../Hooks/useLeague";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

const LeaguePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoggedIn, user } = useAuth();
    const { leagueInfo, leagueLoading, getLeagueInfo } = useLeague({});

    useEffect(() => {
        getLeagueInfo(id!);
    }, []);

    const handlePlayerClick = (row: PlayerProfile) => {
        navigate(`/player/${row.id}`);
    };

    const handleGameClick = (row: GameProfile) => {
        navigate(`/game/${row.id}`);
    };

    return leagueLoading ? (
        <LoadingSpinner />
    ) : (
        <>
            <LeagueInfo
                isUserJoined={leagueInfo.players.filter((p) => p.id == user?.id).length != 0}
                isLoggedIn={isLoggedIn()}
                leagueInfo={leagueInfo}
                leagueId={id!}
            />
            <div className="flex px-2">
                <Table
                    className="w-1/2 pr-2"
                    title="Scoreboard"
                    loading={leagueLoading}
                    data={leagueInfo.players.sort((a, b) => b.score - a.score)}
                    columns={scoreboardColumns}
                    onRowClicked={handlePlayerClick}
                    pagination={true}
                />
                <div className="flex-col w-1/2 pl-2">
                    <Table
                        className="pb-2"
                        title="Live games"
                        loading={leagueLoading}
                        data={leagueInfo.liveGames}
                        columns={leagueGameTest}
                        onRowClicked={handleGameClick}
                        pagination={true}
                    />
                    <Table
                        className="py-2"
                        title="Upcomming games"
                        loading={leagueLoading}
                        data={leagueInfo.upcommingGames}
                        columns={leagueGameTest}
                        onRowClicked={handleGameClick}
                        pagination={true}
                    />
                    <Table
                        className="py-2"
                        title="Finished games"
                        loading={leagueLoading}
                        data={leagueInfo.finishedGames}
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
