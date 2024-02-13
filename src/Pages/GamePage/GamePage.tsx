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
    }
  }, [data]);

  const handlePlayerClick = (row: PlayerProfile) => {
    navigate(`/player/${row.id}`);
  };

  return (
    <div className="flex">
      <h1>fsdf</h1>
      <h1>fsdf</h1>
    </div>
  );
};

export default GamePage;
