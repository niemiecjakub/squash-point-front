import { useNavigate, useParams } from "react-router-dom";
import PlayerStatisticsOverviewList from "../../Components/PlayerStatisticsOverviewList/PlayerStatisticsOverviewList";
import { GameProfile, LeagueProfile, PlayerProfileDetails } from "../../squashpoint";
import { useEffect, useState } from "react";
import { playerGetByIdApi } from "../../Services/PlayerService";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Table from "../../Components/Table/Table";
import { gamesColumns, leaguesColumns } from "../../Helpers/TableColumns";
import PlayerInfo from "../../Components/PlayerInfo/PlayerInfo";

const PlayerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playerData, setplayerData] = useState<PlayerProfileDetails>();
    const [playerDataLoading, setplayerDataLoading] = useState<boolean>(true);

    useEffect(() => {
        getplayerData();
    }, []);

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

    return (
        <>
            {playerDataLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {playerData && (
                        <>
                            <PlayerInfo data={playerData} />
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
