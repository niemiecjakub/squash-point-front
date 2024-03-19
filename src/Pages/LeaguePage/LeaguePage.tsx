import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Table from "../../Components/Table/Table";
import { GameProfile, PlayerProfile, LeagueProfileDetails } from "../../squashpoint";
import { leagueGetByIdApi, leagueJoinApi, leagueLeaveApi } from "../../Services/LeagueService";
import { useAuth } from "../../Context/useAuth";
import { gamesColumns, scoreboardColumns } from "../../Helpers/TableColumns";
import LeagueSideMenu from "../../Components/LeagueSideMenu/LeagueSideMenu";

const LeaguePage = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [leagueInfo, setLeagueInfo] = useState<LeagueProfileDetails>();
    const [leagueLoading, setLeagueLoading] = useState<boolean>(true);

    useEffect(() => {
        getLeagueInfo();
    }, []);

    const getLeagueInfo = () => {
        setLeagueLoading(true);
        leagueGetByIdApi(id!).then((res) => {
            setLeagueInfo(res?.data!);
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
                            <LeagueSideMenu leagueInfo={leagueInfo} leagueId={id!} getLeagueInfo={getLeagueInfo} />
                        </div>
                        <div className="flex-col w-3/5 px-2">
                            <Table
                                title="Scoreboard"
                                loading={leagueLoading}
                                data={leagueInfo.players.sort((a, b) => b.score - a.score)}
                                columns={scoreboardColumns}
                                onRowClicked={handlePlayerClick}
                            />

                            <Table
                                className="py-4"
                                title="Games"
                                loading={leagueLoading}
                                data={leagueInfo.games}
                                columns={gamesColumns}
                                onRowClicked={handleGameClick}
                            />
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default LeaguePage;
