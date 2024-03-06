import React, { useState } from "react";
import { GameProfileDetails, PlayerProfile } from "../../squashpoint";
import { updateGameApi } from "../../Services/GameService";
import { createSetApi, updateSetApi } from "../../Services/SetService";
import { createPointApi } from "../../Services/PointService";

interface SetScore {
  player1: number;
  player2: number;
  winner: string;
}

interface GameScore {
  sets: SetScore[];
}

interface Props {
  gameInfo: GameProfileDetails;
  gameId: string;
  getGameInfo: () => void;
}

const getGameWinner = (
  gameScore: GameScore,
  players: PlayerProfile[]
): PlayerProfile | null => {
  const player1SetsWon = gameScore.sets.filter(
    (set) => set.winner === players[0].id
  ).length;
  const player2SetsWon = gameScore.sets.filter(
    (set) => set.winner === players[1].id
  ).length;

  if (player1SetsWon >= 3) {
    return players[0];
  } else if (player2SetsWon >= 3) {
    return players[1];
  } else {
    return null;
  }
};

const isValidSquashSetScore = ({ player1, player2 }: SetScore): boolean => {
  const minScore = 11;
  const pointDifference = Math.abs(player1 - player2);

  if (player1 > minScore || player2 > minScore) {
    return pointDifference == 2;
  }

  if (player1 == minScore || player2 == minScore) {
    return pointDifference >= 2;
  }

  return false;
};

const GameOptions: React.FC<Props> = ({ gameInfo, gameId, getGameInfo }) => {
  const [isGameEditOpen, setIsGameEditOpen] = useState<boolean>(false);
  const [gameScore, setGameScore] = useState<GameScore>({
    sets: [
      { player1: 0, player2: 0, winner: "" },
      { player1: 0, player2: 0, winner: "" },
      { player1: 0, player2: 0, winner: "" },
      { player1: 0, player2: 0, winner: "" },
      { player1: 0, player2: 0, winner: "" },
    ],
  });

  const handleScoreChange = (
    setIndex: number,
    player: "player1" | "player2",
    value: number
  ) => {
    setGameScore((prevState) => {
      const newSets = [...prevState.sets];
      newSets[setIndex] = {
        ...newSets[setIndex],
        [player]: value,
      };
      return { sets: newSets };
    });
  };

  const submitScore = () => {
    gameScore.sets.forEach((set, setIndex) => {
      const { player1, player2 } = set;
      if (!isValidSquashSetScore(set)) {
        setSetWinner("", setIndex);
        return;
      }
      player1 > player2
        ? setSetWinner(gameInfo.players[0].id, setIndex)
        : setSetWinner(gameInfo.players[1].id, setIndex);
    });
  };

  const setSetWinner = (winner: string, setIndex: number) => {
    setGameScore((prevState) => {
      const newSets = [...prevState.sets];
      newSets[setIndex] = {
        ...newSets[setIndex],
        winner: winner,
      };
      return { sets: newSets };
    });
  };

  const handleGameStart = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    updateGameApi(gameId!, "Started", null)
      .then(() => createSetApi(gameId!))
      .then(() => getGameInfo());
  };

  const handleGameEnd = async () => {
    const gameWinner = getGameWinner(gameScore, gameInfo.players);
    if (gameWinner) {
      await gameScore.sets
        .filter((set) => set.winner != "")
        .forEach(({ player1, player2, winner }) => {
          createSetApi(gameId)
            .then((res) => {
              const setId = res?.data.id;
              updateSetApi(setId, winner);
              [...Array(player1)].forEach(async (p) =>
                createPointApi(setId, gameInfo.players[0].id, "N")
              );
              [...Array(player2)].forEach(async (p) =>
                createPointApi(setId, gameInfo.players[1].id, "N")
              );
            })
            .then(() => updateGameApi(gameId, "Finished", gameWinner.id))
            .then(() => getGameInfo());
        });
    }
  };

  return (
    <>
      <div className="bg-green-200 p-4 w-full">
        <button className="w-full" onClick={handleGameStart}>
          Start game
        </button>
      </div>
      <div className="bg-yellow-200 p-4 w-full">
        <button className="w-full" onClick={() => setIsGameEditOpen((o) => !o)}>
          Enter score
        </button>
      </div>
      {isGameEditOpen && (
        <div>
          {gameScore.sets.map((set, index) => (
            <div key={index}>
              <p>Set: {index + 1}</p>
              {gameInfo.players[0].fullName} (
              <input
                type="number"
                min={0}
                value={set.player1}
                onChange={(e) =>
                  handleScoreChange(index, "player1", parseInt(e.target.value))
                }
              />
              :
              <input
                type="number"
                min={0}
                value={set.player2}
                onChange={(e) =>
                  handleScoreChange(index, "player2", parseInt(e.target.value))
                }
              />
              ){gameInfo.players[1].fullName}
              <br />
              winner :{" "}
              {gameInfo.players.filter((p) => set.winner == p.id)[0]?.fullName}
            </div>
          ))}
          <button
            className="w-full bg-green-300 my-2 py-2"
            onClick={submitScore}
          >
            submit
          </button>
          {gameInfo.players[0].fullName}
          {
            gameScore.sets.filter((s) => s.winner == gameInfo.players[0].id)
              .length
          }
          :{" "}
          {
            gameScore.sets.filter((s) => s.winner == gameInfo.players[1].id)
              .length
          }
          {gameInfo.players[1].fullName}
          <button
            className="w-full bg-blue-300 py-4 my-2"
            onClick={handleGameEnd}
          >
            end game
          </button>
        </div>
      )}
    </>
  );
};

export default GameOptions;
