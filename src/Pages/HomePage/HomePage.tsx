import React from "react";
import LeagueList from "../../Components/LeagueList/LeagueList";
import PlayerList from "../../Components/PlayerList/PlayerList";
import NewPlayerForm from "../../Components/NewPlayerForm/NewPlayerForm";

const HomePage: React.FC = () => {
  return (
    <>
      <div className="flex">
        <LeagueList className="w-1/2 mx-2" title="Leagues"/>
        <PlayerList className="w-1/2 mx-2" title="Players"/>
      </div>
      <NewPlayerForm />
    </>
  );
};

export default HomePage;
