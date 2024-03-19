import React, { useEffect, useState } from "react";
import { GameProfile, LeagueProfile, PlayerProfile } from "../../squashpoint";
import { useNavigate } from "react-router";
import Table from "../../Components/Table/Table";
import { leaguesGetApi } from "../../Services/LeagueService";
import { playersGetApi } from "../../Services/PlayerService";
import { upcommingGamesGetApi } from "../../Services/GameService";
import { gamesColumns, leaguesColumns, playersColumns } from "../../Helpers/TableColumns";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [leagues, setLeagues] = useState<LeagueProfile[]>([]);
    const [leaguesLoading, setLeaguesLoading] = useState<boolean>(true);

    const [players, setPlayers] = useState<PlayerProfile[]>([]);
    const [playersLoading, setPlayersLoading] = useState<boolean>(true);

    const [games, setGames] = useState<GameProfile[]>([]);
    const [gamesLoading, setGamesLoading] = useState<boolean>(true);

    useEffect(() => {
        getLeagues();
        getPlayers();
        getUpcommingGames();
    }, []);

    const getLeagues = () => {
        setLeaguesLoading(true);
        leaguesGetApi().then((res) => {
            setLeagues(res?.data!);
            setLeaguesLoading(false);
        });
    };
    const getPlayers = () => {
        setPlayersLoading(true);
        playersGetApi().then((res) => {
            setPlayers(res?.data!);
            setPlayersLoading(false);
        });
    };
    const getUpcommingGames = () => {
        setGamesLoading(true);
        upcommingGamesGetApi().then((res) => {
            setGames(res?.data!);
            setGamesLoading(false);
        });
    };

    const handleLeagueClick = ({ id }: LeagueProfile) => {
        navigate(`/league/${id}`);
    };

    const handlePlayerClick = ({ id }: PlayerProfile) => {
        navigate(`/player/${id}`);
    };
    const handleGameClick = ({ id }: PlayerProfile) => {
        navigate(`/game/${id}`);
    };

    return (
        <>
            <div className="flex w-full">
                <div className="flex-col w-full px-2">
                    <Table
                        title="Leagues"
                        columns={leaguesColumns}
                        loading={leaguesLoading}
                        data={leagues}
                        onRowClicked={handleLeagueClick}
                    />
                    <Table
                        className="py-4"
                        title="Players"
                        columns={playersColumns}
                        loading={playersLoading}
                        data={players}
                        onRowClicked={handlePlayerClick}
                    />
                </div>
                <div className="flex-col w-full px-2">
                    <Table
                        title="Upcomming league games"
                        columns={gamesColumns}
                        loading={gamesLoading}
                        data={games}
                        onRowClicked={handleGameClick}
                    />
                </div>
            </div>
        </>
    );
};

export default HomePage;
