import React, { useEffect, useState } from "react";
import {
  GameProfile,
  LeagueProfile,
  PlayerProfileDetails,
} from "../../squashpoint";
import { useNavigate, useParams } from "react-router-dom";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";
import LeagueScoreboard from "../../Components/LeagueScoreboard/LeagueScoreboard";
import { TableColumn } from "react-data-table-component";

const leaguesColumns: TableColumn<LeagueProfile>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
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

const PlayerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [playerInfo, setPlayerInfo] = useState<PlayerProfileDetails>();
  const [playerData, error, loading] = useAxiosFetch({
    method: "GET",
    url: "/Player/" + id,
  });

  useEffect(() => {
    if (playerData) {
      setPlayerInfo(playerData);
      console.log(playerData);
    }
  }, [playerData]);

  const handleLeagueClick = (row: LeagueProfile) => {
    navigate(`/league/${row.id}`);
  };

  const handleGameClick = (row: GameProfile) => {
    navigate(`/game/${row.id}`);
  };

  return (
    <div className="flex">
      <LeagueScoreboard
        className="w-1/2 mx-2"
        title="Leagues"
        data={playerInfo?.leagues}
        loading={loading}
        onRowClicked={handleLeagueClick}
        columns={leaguesColumns}
      />
      <LeagueScoreboard
        className="w-1/2 mx-2"
        title="Games"
        data={playerInfo?.games}
        loading={loading}
        onRowClicked={handleGameClick}
        columns={gamesColumns}
      />
    </div>
  );
};

export default PlayerPage;
