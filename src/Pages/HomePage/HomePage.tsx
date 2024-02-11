import React from "react";
import LeagueList from "../../Components/LeagueList/LeagueList";
import PlayerList from "../../Components/PlayerList/PlayerList";
import NewPlayerForm from "../../Components/NewPlayerForm/NewPlayerForm";


const HomePage: React.FC = () => {

  return (
    <>
      <LeagueList />
      <PlayerList />
      <NewPlayerForm />
    </>
  );
};

export default HomePage;
