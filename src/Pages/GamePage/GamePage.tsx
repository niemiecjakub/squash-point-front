import { useEffect, useState } from "react";
import { GameProfileDetails, PlayerProfile } from "../../squashpoint";
import { useNavigate, useParams } from "react-router";
import { gameGetByIdApi } from "../../Services/GameService";
import GameInProgress from "../../Components/GameInProgress/GameInProgress";
import GameUnfinished from "../../Components/GameUnfinished/GameUnfinished";
import GameFinished from "../../Components/GameFinished/GameFinished";

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

  const getGameInfo = async () => {
    setLoading(true);
    await gameGetByIdApi(id!).then((res) => {
      setLoading(false);
      setGameInfo(res?.data!);
    });
  };

  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <h1 className="font-bold">
            {gameInfo?.players[0].fullName} vs {gameInfo?.players[1].fullName}
          </h1>
          <h1>date: {gameInfo?.date}</h1>

          {gameInfo?.status == "Unfinished" && (
            <GameUnfinished
              gameInfo={gameInfo}
              gameId={id!}
              getGameInfo={getGameInfo}
            />
          )}
          {gameInfo?.status == "Started" && (
            <GameInProgress
              gameInfo={gameInfo}
              gameId={id!}
              getGameInfo={getGameInfo}
            />
          )}
          {gameInfo?.status == "Finished" && (
            <GameFinished gameId={id!} players={gameInfo.players} />
          )}
        </>
      )}
    </div>
  );
};

export default GamePage;
