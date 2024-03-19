import { useNavigate, useParams } from "react-router-dom";
import PlayerStatisticsOverviewList from "../../Components/PlayerStatisticsOverviewList/PlayerStatisticsOverviewList";
import { GameProfile, LeagueProfile, PlayerProfileDetails } from "../../squashpoint";
import { useEffect, useState } from "react";
import { playerGetByIdApi } from "../../Services/PlayerService";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";
import Table from "../../Components/Table/Table";
import { gamesColumns, leaguesColumns } from "../../Helpers/TableColumns";

const PlayerPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [playerInfo, setPlayerInfo] = useState<PlayerProfileDetails>();
    const [playerInfoLoading, setPlayerInfoLoading] = useState<boolean>(true);

    useEffect(() => {
        getPlayerInfo();
    }, []);

    const getPlayerInfo = () => {
        setPlayerInfoLoading(true);
        playerGetByIdApi(id!).then((res) => {
            setPlayerInfo(res?.data!);
        });
        setPlayerInfoLoading(false);
    };

    const handleLeagueClick = (row: LeagueProfile): void => {
        navigate(`/league/${row.id}`);
    };

    const handleGameClick = (row: GameProfile): void => {
        navigate(`/game/${row.id}`);
    };

    return (
        <>
            {playerInfoLoading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {playerInfo && (
                        <>
                            <h1 className="text-xl py-4 mx-2">{playerInfo.fullName}</h1>
                            <div className="flex w-full">
                                <div className="flex-col w-full px-2">
                                    <Table
                                        title="Leagues"
                                        data={playerInfo.leagues}
                                        loading={playerInfoLoading}
                                        onRowClicked={handleLeagueClick}
                                        columns={leaguesColumns}
                                    />
                                </div>
                                <div className="flex-col w-full px-2">
                                    <Table
                                        title="Games"
                                        data={playerInfo.games}
                                        loading={playerInfoLoading}
                                        onRowClicked={handleGameClick}
                                        columns={gamesColumns}
                                    />
                                </div>
                            </div>
                        </>
                    )}
                </>
            )}
            <PlayerStatisticsOverviewList playerId={id!} />
        </>
    );
};

export default PlayerPage;
