import React, { useEffect, useState } from "react";
import {
  GameProfile,
  LeagueProfile,
  PlayerProfileDetails,
} from "../../squashpoint";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../Components/Table/Table";
import { TableColumn } from "react-data-table-component";
import { playerGetByIdApi } from "../../Services/PlayerService";

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
  const [playerInfo, setPlayerInfo] = useState<PlayerProfileDetails>({
    id: "",
    fullName: "",
    email: "",
    sex: "",
    leagues: [],
    games: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getPlayerInfo();
  }, []);

  const getPlayerInfo = () => {
    setLoading(true);
    playerGetByIdApi(id!).then((res) => {
      setLoading(false);
      setPlayerInfo(res?.data!);
    });
  };

  const handleLeagueClick = (row: LeagueProfile) => {
    navigate(`/league/${row.id}`);
  };

  const handleGameClick = (row: GameProfile) => {
    navigate(`/game/${row.id}`);
  };

  return (
    <>
      <h1 className="text-2xl my-4">League: {playerInfo.fullName}</h1>
      <div className="flex">
        <Table
          className="w-1/2 mx-2"
          title="Leagues"
          data={playerInfo.leagues}
          loading={loading}
          onRowClicked={handleLeagueClick}
          columns={leaguesColumns}
        />
        <Table
          className="w-1/2 mx-2"
          title="Games"
          data={playerInfo.games}
          loading={loading}
          onRowClicked={handleGameClick}
          columns={gamesColumns}
        />
      </div>
    </>
  );
};

export default PlayerPage;
