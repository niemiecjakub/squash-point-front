import React from "react";
import LeagueList from "../../Components/LeagueList/LeagueList";
import PlayerList from "../../Components/PlayerList/PlayerList";
import NewPlayerForm from "../../Components/NewPlayerForm/NewPlayerForm";


const HomePage: React.FC = () => {

  return (
    <div className="flex flex-col">
      <LeagueList />
      <PlayerList />
      <NewPlayerForm />
    </div>
  );
};

export default HomePage;
