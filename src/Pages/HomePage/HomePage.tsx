import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import {
  GameProfile,
  LeagueGameProfile,
  LeagueProfile,
  PlayerProfile,
} from "../../squashpoint";
import { useNavigate } from "react-router";
import Table from "../../Components/Table/Table";
import UpcommingGames from "../../Components/UpcommingGames/UpcommingGames";
import { leaguesGetApi } from "../../Services/LeagueService";
import { playersGetApi } from "../../Services/PlayerService";
import { gamesGetApi } from "../../Services/GameService";

const leaguesColumns: TableColumn<LeagueProfile>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
];

const playersColumns: TableColumn<PlayerProfile>[] = [
  {
    name: "Name",
    selector: (row) => row.fullName,
    sortable: true,
  },
];

const gamesColumns: TableColumn<LeagueGameProfile>[] = [
  {
    name: "League",
    selector: (row) => row.league.name,
    sortable: true,
  },
  {
    name: "Player1",
    selector: (row) => row.players[0].fullName,
    sortable: true,
  },
  {
    name: "Player2",
    selector: (row) => row.players[1].fullName,
    sortable: true,
  },
  {
    name: "Date",
    selector: (row) => row.date,
    sortable: true,
  },
  {
    name: "Status",
    selector: (row) => row.status,
    sortable: true,
  },
];

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
    getGames();
  }, []);

  const getLeagues = () => {
    setLeaguesLoading(true);
    leaguesGetApi().then((res) => {
      setLeaguesLoading(false);
      setLeagues(res?.data!);
    });
  };
  const getPlayers = () => {
    setPlayersLoading(true);
    playersGetApi().then((res) => {
      setPlayersLoading(false);
      setPlayers(res?.data!);
    });
  };
  const getGames = () => {
    setPlayersLoading(true);
    gamesGetApi().then((res) => {
      setPlayersLoading(false);
      setGames(res?.data!);
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
      <div className="flex">
        <Table
          className="w-1/2 mx-2"
          title="Leagues"
          columns={leaguesColumns}
          loading={leaguesLoading}
          data={leagues}
          onRowClicked={handleLeagueClick}
        />
        <Table
          className="w-1/2 mx-2"
          title="Players"
          columns={playersColumns}
          loading={playersLoading}
          data={players}
          onRowClicked={handlePlayerClick}
        />
      </div>
      <div className="flex ">
        <Table
          className="w-1/2 mx-2"
          title="Upcomming league games"
          columns={gamesColumns}
          loading={gamesLoading}
          data={games}
          onRowClicked={handleGameClick}
        />
      </div>
    </>
  );
};

export default HomePage;
