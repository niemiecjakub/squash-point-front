import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";
import { GameProfile, LeagueGameProfile, LeagueProfile, PlayerProfile } from "../../squashpoint";
import { useNavigate } from "react-router";
import LeagueScoreboard from "../../Components/LeagueScoreboard/LeagueScoreboard";
import UpcommingGames from "../../Components/UpcommingGames/UpcommingGames";

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
  const [leaguesData, leaguesError, leaguesLoading, leagueFetchData] =
    useAxiosFetch({
      method: "GET",
      url: "/League/league-list",
    });

  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [playersData, playersError, playersLoading, playersFetchData] =
    useAxiosFetch({
      method: "GET",
      url: "/Player/player-list",
    });

    const [games, setGames] = useState<GameProfile[]>();
    const [gamesData, gamesError, gamesLoading, gameFetchData] = useAxiosFetch({
      method: "GET",
      url: `/Game/game-list`, 
      params : {
        GameStatus: "Unfinished"
      }
    });

  useEffect(() => {
    if (leaguesData) {
      setLeagues(leaguesData);
    }
    if (playersData) {
      setPlayers(playersData);
    }
    if (gamesData) {
      console.log(gamesData)
      setGames(gamesData);
    }
  }, [leaguesData, playersData, gamesData]);

  const handleLeagueClick = (row: LeagueProfile) => {
    navigate(`/league/${row.id}`);
  };

  const handlePlayerClick = (row: PlayerProfile) => {
    navigate(`/player/${row.id}`);
  };
  const handleGameClick = (row: PlayerProfile) => {
    navigate(`/game/${row.id}`);
  };

  return (
    <>
      <div className="flex">
        <LeagueScoreboard
          className="w-1/2 mx-2"
          title="Leagues"
          columns={leaguesColumns}
          loading={leaguesLoading}
          data={leagues}
          onRowClicked={handleLeagueClick}
        />
        <LeagueScoreboard
          className="w-1/2 mx-2"
          title="Players"
          columns={playersColumns}
          loading={playersLoading}
          data={players}
          onRowClicked={handlePlayerClick}
        />
      </div>
      <div className="flex ">
      <LeagueScoreboard
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
