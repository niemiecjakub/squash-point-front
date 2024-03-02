import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Table from "../../Components/Table/Table";
import {
  GameProfile,
  PlayerProfile,
  LeaguePlayerScoreboard,
} from "../../squashpoint";
import { TableColumn } from "react-data-table-component";
import NewGame from "../../Components/NewGame/NewGame";
import LeagueOptions from "../../Components/LeagueOptions/LeagueOptions";
import {
  leagueGamesGetApi,
  leaguePlayersGetApi,
} from "../../Services/LeagueService";

const scoreboardColumns: TableColumn<LeaguePlayerScoreboard>[] = [
  {
    name: "Score",
    selector: (row) => row.score,
    sortable: true,
  },
  {
    name: "Name",
    selector: (row) => row.fullName,
    sortable: true,
  },
  {
    name: "Games won",
    selector: (row) => row.gamesWon,
    sortable: true,
  },
  {
    name: "Games Lost",
    selector: (row) => row.gamesLost,
    sortable: true,
  },
  {
    name: "Games played",
    selector: (row) => row.gamesPlayed,
    sortable: true,
  },
];

const gamesColumns: TableColumn<GameProfile>[] = [
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

const LeaguePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [players, setPlayers] = useState<LeaguePlayerScoreboard[]>([]);
  const [playersLoading, setPlayersLoading] = useState<boolean>(true);
  const [games, setGames] = useState<GameProfile[]>([]);
  const [gamesLoading, setGamesLoading] = useState<boolean>(true);

  useEffect(() => {
    getPlayers();
    getGames();
  }, []);

  const getPlayers = () => {
    setPlayersLoading(true);
    leaguePlayersGetApi(id!).then((res) => {
      setPlayersLoading(false);
      setPlayers(res?.data!);
    });
  };

  const getGames = () => {
    setGamesLoading(true);
    leagueGamesGetApi(id!).then((res) => {
      setGamesLoading(false);
      setGames(res?.data!);
    });
  };

  const handlePlayerClick = (row: PlayerProfile) => {
    navigate(`/player/${row.id}`);
  };

  const handleGameClick = (row: GameProfile) => {
    navigate(`/game/${row.id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <Table
          className="w-1/2 mx-2"
          title="Scoreboard"
          loading={playersLoading}
          data={players.sort((a, b) => b.score - a.score)}
          columns={scoreboardColumns}
          onRowClicked={handlePlayerClick}
        />

        <Table
          className="w-1/2 mx-2"
          title="Games"
          loading={gamesLoading}
          data={games}
          columns={gamesColumns}
          onRowClicked={handleGameClick}
        />
      </div>
      <div className="flex">
        {/* <NewGame
          className="mx-2 bg-blue-200 w-1/2"
          players={players}
          leagueId={parseInt(id || "0", 10)}
        />
        <LeagueOptions
          className="mx-2 bg-red-200 w-1/2"
          leagueId={parseInt(id || "0", 10)}
        /> */}
      </div>
    </div>
  );
};

export default LeaguePage;
