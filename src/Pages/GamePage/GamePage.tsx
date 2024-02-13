import React, { useEffect, useState } from "react";
import { GameProfileDetails, PlayerProfile } from "../../squashpoint";
import { useNavigate, useParams } from "react-router";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";

const GamePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [gameData, setGameData] = useState<GameProfileDetails>();
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "GET",
    url: `/Game/${id}`,
  });

  useEffect(() => {
    if (data) {
      setGameData(data);
      console.log(data);
    }
  }, [data]);

  const handlePlayerClick = (row: PlayerProfile) => {
    navigate(`/player/${row.id}`);
  };

  const handleStartGame =() => {
    
  }

  return (
    <div className="">
      {gameData && (
        <>
          <h1>{gameData.status}</h1>
          <h1>
            {gameData.players[0].fullName} vs.{gameData.players[1].fullName}
          </h1>
          <h1>{gameData.date}</h1>
        </>
      )}
      <div>
        <button className="bg-green-200 p-4">Start game</button>
      </div>
    </div>
  );
};

export default GamePage;
