import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Table from "../../Components/Table/Table";
import {
  GameProfile,
  PlayerProfile,
  LeaguePlayerScoreboard,
  LeagueProfileDetails,
} from "../../squashpoint";
import { TableColumn } from "react-data-table-component";
import NewGame from "../../Components/NewGame/NewGame";
import LeagueOptions from "../../Components/LeagueOptions/LeagueOptions";
import {
  leagueGetByIdApi,
  leagueJoinApi,
  leagueLeaveApi,
} from "../../Services/LeagueService";
import { useAuth } from "../../Context/useAuth";
import { playerLeaguesGetByIdApi } from "../../Services/PlayerService";

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
  const { isLoggedIn, user } = useAuth();
  const [leagueInfo, setLeagueInfo] = useState<LeagueProfileDetails>({
    id: "",
    name: "",
    players: [],
    games: [],
  });
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

  const handleLeagueJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    leagueJoinApi(id!).then(() => getLeagueInfo());
  };

  const handleLeaguLeave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    leagueLeaveApi(id!).then(() => getLeagueInfo());
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-2xl my-4">League: {leagueInfo.name}</h1>
      <div className="flex">
        <Table
          className="w-1/2 mx-2"
          title="Scoreboard"
          loading={leagueLoading}
          data={leagueInfo.players.sort((a, b) => b.score - a.score)}
          columns={scoreboardColumns}
          onRowClicked={handlePlayerClick}
        />

        <Table
          className="w-1/2 mx-2"
          title="Games"
          loading={leagueLoading}
          data={leagueInfo.games}
          columns={gamesColumns}
          onRowClicked={handleGameClick}
        />
      </div>
      <div className="flex">
        <NewGame
          className="mx-2 bg-blue-200 w-1/2"
          players={leagueInfo.players}
          leagueId={id!}
        />
        <LeagueOptions
          isUserJoined={
            leagueInfo.players.filter((p) => p.id == user?.id).length == 0
          }
          isLoggedIn={isLoggedIn()}
          className="mx-2 bg-red-200 w-1/2"
          leagueLeave={handleLeaguLeave}
          leagueJoin={handleLeagueJoin}
        />
      </div>
    </div>
  );
};

export default LeaguePage;
