import React, { useEffect, useState } from "react";
import { TableColumn } from "react-data-table-component";
import NewPlayerForm from "../../Components/NewPlayerForm/NewPlayerForm";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";
import { LeagueProfile, PlayerProfile } from "../../squashpoint";
import { useNavigate } from "react-router";
import LeagueScoreboard from "../../Components/LeagueScoreboard/LeagueScoreboard";

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

  useEffect(() => {
    if (leaguesData) {
      setLeagues(leaguesData);
    }
    if (playersData) {
      setPlayers(playersData);
    }
  }, [leaguesData, playersData]);

  const handleLeagueClick = (row: LeagueProfile) => {
    navigate(`/league/${row.id}`);
  };

  const handlePlayerClick = (row: PlayerProfile) => {
    navigate(`/player/${row.id}`);
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
      <NewPlayerForm />
    </>
  );
};

export default HomePage;
