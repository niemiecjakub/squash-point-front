import React, { useEffect, useState } from "react";
import {
  GameProfile,
  LeagueProfile,
  PlayerGamesOverview,
  PlayerProfileDetails,
  StatisticsOverview,
} from "../../squashpoint";
import { useNavigate, useParams } from "react-router-dom";
import Table from "../../Components/Table/Table";
import { TableColumn } from "react-data-table-component";
import {
  playerGamesOverviewGetByIdApi,
  playerGetByIdApi,
} from "../../Services/PlayerService";
import { Legend, PieChart, ResponsiveContainer, Pie, Cell } from "recharts";

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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const getOverviewData = (data: StatisticsOverview) => {
  return [
    { name: "won", value: data.won },
    { name: "lost", value: data.played },
  ];
};

const PlayerPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [playerInfo, setPlayerInfo] = useState<PlayerProfileDetails>();
  const [playerInfoLoading, setPlayerInfoLoading] = useState<boolean>(true);
  const [playerGamesOverview, setPlayerGamesOverview] =
    useState<PlayerGamesOverview>();
  const [playerGamesOverviewLoadig, setPlayerGamesOverviewLoading] =
    useState<boolean>(true);

  useEffect(() => {
    getPlayerInfo();
    getGamesOverview();
  }, []);

  if (playerGamesOverview) {
    getOverviewData(playerGamesOverview.games);
  }

  const getGamesOverview = () => {
    setPlayerGamesOverviewLoading(true);
    playerGamesOverviewGetByIdApi(id!).then((res) => {
      setPlayerGamesOverview(res?.data!);
    });
    setPlayerGamesOverviewLoading(false);
  };

  const getPlayerInfo = () => {
    setPlayerInfoLoading(true);
    playerGetByIdApi(id!).then((res) => {
      setPlayerInfo(res?.data!);
    });
    setPlayerInfoLoading(false);
  };

  const handleLeagueClick = (row: LeagueProfile) => {
    navigate(`/league/${row.id}`);
  };

  const handleGameClick = (row: GameProfile) => {
    navigate(`/game/${row.id}`);
  };

  return (
    <>
      {playerInfo && (
        <>
          <h1 className="text-2xl my-4">Player: {playerInfo.fullName}</h1>
          <div className="flex">
            <Table
              className="w-1/2 mx-2"
              title="Leagues"
              data={playerInfo.leagues}
              loading={playerInfoLoading}
              onRowClicked={handleLeagueClick}
              columns={leaguesColumns}
            />
            <Table
              className="w-1/2 mx-2"
              title="Games"
              data={playerInfo.games}
              loading={playerInfoLoading}
              onRowClicked={handleGameClick}
              columns={gamesColumns}
            />
          </div>
        </>
      )}
      {playerGamesOverview?.games.played && (
        <div className="flex h-80 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Legend />
              <Pie
                data={getOverviewData(playerGamesOverview.games)}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label
              >
                {getOverviewData(playerGamesOverview.games).map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Legend />
              <Pie
                data={getOverviewData(playerGamesOverview.sets)}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label
              >
                {getOverviewData(playerGamesOverview.sets).map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart width={400} height={400}>
              <Legend />
              <Pie
                data={getOverviewData(playerGamesOverview.points)}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                dataKey="value"
                label
              >
                {getOverviewData(playerGamesOverview.points).map(
                  (entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  )
                )}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </>
  );
};

export default PlayerPage;
