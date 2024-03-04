import { useEffect, useState } from "react";
import {
  GameProfileDetails,
  GameState,
  PlayerProfile,
} from "../../squashpoint";
import { useNavigate, useParams } from "react-router";
import { gameGetByIdApi, updateGameApi } from "../../Services/GameService";
import { createSetApi } from "../../Services/SetService";
import GameInProgress from "../../Components/GameInProgress/GameInProgress";
import GameOptions from "../../Components/GameOptions/GameOptions";

const GamePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [gameInfo, setGameInfo] = useState<GameProfileDetails>({
    id: "",
    status: "",
    date: "",
    players: [],
    sets: [],
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getGameInfo();
  }, []);

  const getGameInfo = () => {
    setLoading(true);
    gameGetByIdApi(id!).then((res) => {
      setLoading(false);
      setGameInfo(res?.data!);
    });
  };

  const handlePlayerClick = (row: PlayerProfile) => {
    navigate(`/player/${row.id}`);
  };

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <h1>{gameInfo?.status}</h1>
          <h1 className="font-bold">
            {gameInfo?.players[0].fullName} vs {gameInfo?.players[1].fullName}
          </h1>
          <h1>date: {gameInfo?.date}</h1>
          {gameInfo?.status == "Started" ? (
            <GameInProgress
              gameInfo={gameInfo}
              gameId={id!}
              getGameInfo={getGameInfo}
            />
          ) : (
            <GameOptions
              gameInfo={gameInfo}
              gameId={id!}
              getGameInfo={getGameInfo}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GamePage;
