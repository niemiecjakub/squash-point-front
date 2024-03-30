import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Table from "../../Components/Table/Table";
import { leaguesGetApi } from "../../Services/LeagueService";
import { playersGetApi } from "../../Services/PlayerService";
import { upcommingGamesGetApi } from "../../Services/GameService";
import { HomePageGamesColumns, leagueGameTest, leaguesColumns, playersColumns } from "../../Helpers/TableColumns";
import { League } from "../../Models/League";
import { Player } from "../../Models/Player";
import { Game } from "../../Models/Game";

const HomePage: React.FC = () => {
    const navigate = useNavigate();
    const [leagues, setLeagues] = useState<League[]>([]);
    const [leaguesLoading, setLeaguesLoading] = useState<boolean>(true);

    const [players, setPlayers] = useState<Player[]>([]);
    const [playersLoading, setPlayersLoading] = useState<boolean>(true);

    const [games, setGames] = useState<Game[]>([]);
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

    const handleLeagueClick = ({ id }: League) => {
        navigate(`/league/${id}`);
    };
    const handlePlayerClick = ({ id }: Player) => {
        navigate(`/player/${id}`);
    };
    const handleGameClick = ({ id }: Game) => {
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
                        columns={leagueGameTest}
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
