import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import LeagueScoreboard from "../../Components/LeagueScoreboard/LeagueScoreboard";
import {
  GameProfile,
  LeagueProfileDetails,
  PlayerProfile,
  LeaguePlayerScoreboard
} from "../../squashpoint";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";
import { TableColumn } from "react-data-table-component";
import NewLeagueGame from "../../Components/NewLeagueGame/NewLeagueGame";
import NewLeaguePlayer from "../../Components/NewLeaguePlayer/NewLeaguePlayer";

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
  const [leagueData, setLeagueData] = useState<LeagueProfileDetails>();
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "GET",
    url: `/League/${id}`,
  });

  useEffect(() => {
    if (data) {
      setLeagueData(data);
      console.log(data)
    }
  }, [data]);

  const handlePlayerClick = (row: PlayerProfile) => {
    navigate(`/player/${row.id}`);
  };

  const handleGameClick = (row: GameProfile) => {
    navigate(`/game/${row.id}`);
  };

  return (
    <div className="flex flex-col">
      <div className="flex">
        <LeagueScoreboard
          className="w-1/2 mx-2"
          title="Scoreboard"
          loading={loading}
          data={leagueData?.players.sort((a, b) => b.score - a.score)}
          columns={scoreboardColumns}
          onRowClicked={handlePlayerClick}
        />

        <LeagueScoreboard
          className="w-1/2 mx-2"
          title="Games"
          loading={loading}
          data={leagueData?.games}
          columns={gamesColumns}
          onRowClicked={handleGameClick}
        />
      </div>
      <div className="flex">
        <NewLeagueGame
          className="mx-2 bg-blue-200 w-1/2"
          players={leagueData?.players}
          leagueId={parseInt(id || "0", 10)}
        />
        <NewLeaguePlayer
          players={leagueData?.players}
          className="mx-2 bg-red-200 w-1/2"
          leagueId={parseInt(id || "0", 10)}
        />
      </div>
    </div>
  );
};

export default LeaguePage;
