import { useEffect, useState } from "react";
import {
  GameProfileDetails,
  GameState,
  PlayerProfile,
  SetDetails,
} from "../../squashpoint";
import { useNavigate, useParams } from "react-router";
import GameDashboard from "../../Components/GameDashboard/GameDashboard";
import { gameGetByIdApi } from "../../Services/GameService";

const countPoints = (set: SetDetails, playerId: number) => {
  return set.points.filter((e) => e.winner.id === playerId).length;
};

const checkGameWin = () => {};

const GamePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [currentSetData, setCurrentSetData] = useState<GameState>();
  const [gameInfo, setGameInfo] = useState<GameProfileDetails>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const data = getGameInfo();
    console.log(data);
  }, []);

  const getGameInfo = () => {
    setLoading(true);
    gameGetByIdApi(id!).then((res) => {
      setLoading(false);
      setGameInfo(res?.data!);
    });
  };

  // useEffect(() => {
  //   if (data) {
  //     setGameData(data);
  //     if (data.sets.length > 0) {
  //       const { players, sets, player1Sets, player2Sets } = data;
  //       const currentSet = sets[0];
  //       const player1Points = countPoints(currentSet, players[0].id);
  //       const player2Points = countPoints(currentSet, players[1].id);
  //       if (player2Points == 11 || player1Points == 11) {
  //         const winnerId = player1Points == 11 ? players[0].id : players[1].id;
  //         newSet(winnerId, currentSet.id);
  //       }
  //       if (player1Sets == 3 || player2Sets == 3) {
  //         const winnerId = player1Sets == 3 ? players[0].id : players[1].id;
  //         handleGameWinner(winnerId);
  //       }
  //       setCurrentSetData({
  //         setId: currentSet.id,
  //         player1Points,
  //         player2Points,
  //       });
  //     }
  //   }
  // }, [data]);

  // const newSet = async (winnerId: number, setId: number) => {
  //   await axios.put(`/Set/${setId}`, {
  //     winnerId,
  //   });

  //   await axios.post(`/Set`, null, {
  //     params: {
  //       GameId: id,
  //       WinnerId: null,
  //     },
  //   });
  //   fetchData();
  // };

  const handlePlayerClick = (row: PlayerProfile) => {
    navigate(`/player/${row.id}`);
  };

  // const handleGameStart = async (e: any): Promise<void> => {
  //   const { data } = await axios.put(`/Game/${id}`, {
  //     status: "Started",
  //     winnerId: null,
  //   });
  //   await axios.post(`/Set`, null, {
  //     params: {
  //       GameId: data.id,
  //     },
  //   });
  //   fetchData();
  // };

  // const handleGameWinner = async (playerId: number) => {
  //   await axios.put(`/Game/${id}`, {
  //     status: "Finished",
  //     winnerId: playerId,
  //   });
  //   fetchData();
  // };

  // const handlePointScored = async (
  //   e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  //   winnerId: number
  // ): Promise<void> => {
  //   await axios.post(`/Point`, null, {
  //     params: {
  //       SetId: currentSetData?.setId,
  //       WinnerId: winnerId,
  //       PointType: "N",
  //     },
  //   });
  //   await fetchData();
  // };

  return (
    <div className="flex flex-col items-center">
      {/* {gameData && (
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
                  {currentSetData?.player1Points} :{" "}
                  {currentSetData?.player2Points}
                </div>
                <div className="text-2xl">
                  {gameData.player1Sets} : {gameData.player2Sets}
                </div>
              </div>
              <div className="flex w-full justify-center">
                {gameData?.players.map(({ fullName, id }) => (
                  <button
                    key={id}
                    onClick={(e) => handlePointScored(e, id)}
                    className="bg-green-300 p-3 w-1/2 mx-1"
                  >
                    {fullName} +1
                  </button>
                ))}
              </div>

              <div className="flex w-full justify-center">
                {gameData.sets.map(({ id, winner, points }) => (
                  <div key={id} className="w-1/2">
                    <div>
                      set id: {id} __ points: {points.length}
                    </div>
                    {points.map(({ pointType, winner }, index) => (
                      <p key={index}>
                        {pointType} - {winner?.fullName}
                      </p>
                    ))}
                  </div>
                ))}
                <GameDashboard className="w-1/2" />
              </div>
            </>
          ) : (
            <div className="bg-green-200 p-4 w-full">
              <button className="w-full" onClick={handleGameStart}>
                Start game
              </button>
            </div>
          )}
        </>
      )} */}
    </div>
  );
};

export default GamePage;
