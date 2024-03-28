import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Table from "../../Components/Table/Table";
import { GameProfile, PlayerProfile, LeagueProfileDetails } from "../../squashpoint";
import { leagueGetByIdApi } from "../../Services/LeagueService";
import { useAuth } from "../../Context/useAuth";
import { leagueGameTest, playerPageLastGamesGamesColumns, scoreboardColumns } from "../../Helpers/TableColumns";
import LeagueSideMenu from "../../Components/LeagueSideMenu/LeagueSideMenu";

const LeaguePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { isLoggedIn, user } = useAuth();
    const [leagueInfo, setLeagueInfo] = useState<LeagueProfileDetails>();
    const [leagueLoading, setLeagueLoading] = useState<boolean>(true);

    useEffect(() => {
        getLeagueInfo();
    }, []);

    const getLeagueInfo = () => {
        setLeagueLoading(true);
        leagueGetByIdApi(id!).then((res) => {
            setLeagueInfo(res?.data!);
            console.log(res?.data!.finishedGames)
        });
        setLeagueLoading(false);
    };

    const handlePlayerClick = (row: PlayerProfile) => {
        navigate(`/player/${row.id}`);
    };

    const handleGameClick = (row: GameProfile) => {
        navigate(`/game/${row.id}`);
    };

    return (
        <>
            {leagueInfo && (
                <>
                    <div className="flex w-full">
                        <div className="flex-col w-2/5 px-2">
                            <LeagueSideMenu
                                isUserJoined={leagueInfo.players.filter((p) => p.id == user?.id).length != 0}
                                isLoggedIn={isLoggedIn()}
                                leagueInfo={leagueInfo}
                                leagueId={id!}
                                getLeagueInfo={getLeagueInfo}
                            />
                        </div>
                        <div className="flex-col w-3/5 px-2">
                            <Table
                                title="Scoreboard"
                                loading={leagueLoading}
                                data={leagueInfo.players.sort((a, b) => b.score - a.score)}
                                columns={scoreboardColumns}
                                onRowClicked={handlePlayerClick}
                                pagination={true}
                            />

                            <Table
                                className="py-4"
                                title="Upcomming games"
                                loading={leagueLoading}
                                data={leagueInfo.upcommingGames}
                                columns={leagueGameTest}
                                onRowClicked={handleGameClick}
                                pagination={true}
                            />
                            <Table
                                className="py-4"
                                title="Finished games"
                                loading={leagueLoading}
                                data={leagueInfo.finishedGames}
                                columns={playerPageLastGamesGamesColumns}
                                onRowClicked={handleGameClick}
                                pagination={true}
                            />

                            <Table
                                className="py-4"
                                title="Live games"
                                loading={leagueLoading}
                                data={leagueInfo.liveGames}
                                columns={leagueGameTest}
                                onRowClicked={handleGameClick}
                                pagination={true}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default LeaguePage;
