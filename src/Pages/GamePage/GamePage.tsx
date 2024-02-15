import { useEffect, useState } from "react";
import { GameProfileDetails, PlayerProfile } from "../../squashpoint";
import { useNavigate, useParams } from "react-router";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";
import axios from "axios";

const GamePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [gameScore, setGameScore] = useState({
    player1: {
      sets: 0,
      points: 0,
    },
    player2: {
      sets: 0,
      points: 0,
    },
    currentSetId: 0,
  });
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

  const handleGameStart = (e: any) => {
    axios
      .put(`/Game/${id}`, {
        status: "Started",
        winnerId: null,
      })
      .then((e) => setGameData(e.data));
  };

  const handleNewSet = (e: any) => {
    axios.post(`api/Set`, null, {
      params: {
        GameId: id,
        WinnerId: null,
      },
    });
  };

  const handlePointScored = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    winnerId: number
  ) => {
    console.log(winnerId);
    // axios.post(`/api/Point`, null, {
    //   params: {
    //     WinnerId : winnerId,
    //     PointType: "N",
    //     SetId: setId
    //   }
    // })
  };

  return (
    <div className="flex flex-col items-center">
      {gameData && (
        <>
          <h1>{gameData.status}</h1>
          <h1 className="font-bold">
            {gameData.players[0].fullName} vs {gameData.players[1].fullName}
          </h1>
          <h1>date: {gameData.date}</h1>
          {gameData?.status == "Started" ? (
            <>
              <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">
                  {gameScore.player1.points} : {gameScore.player2.points}
                </div>
                <div className="text-2xl">
                  {gameScore.player1.sets} : {gameScore.player2.sets}
                </div>
              </div>
              <div className="flex flex-col w-full">
                <div className="bg-blue-400 p-4">
                  <button className="w-full">Sart new set</button>
                </div>
                <div className="flex w-full justify-center">
                  {gameData?.players.map(({ fullName, id }) => (
                    <div className="w-1/2 bg-green-300 p-3 mx-1">G
                      <button onClick={(e) => handlePointScored(e, id)}>
                        {fullName} +1
                      </button>
                    </div>
                  ))}
                </div>
              </div>
              {gameData.sets.map(({ points, setId, winner }) => {
                <>
                  <div>{points.map(({winner, pointType}) => <p>{winner?.fullName} - {pointType}</p>)}</div>
                  <div>{setId}</div>
                  <div>{winner?.fullName}</div>
                </>;
              })}
            </>
          ) : (
            <div className="bg-green-200 p-4 w-full">
              <button className="w-full" onClick={handleGameStart}>
                Start game
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default GamePage;
