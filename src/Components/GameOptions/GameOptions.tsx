import React, { useState } from "react";
import { GameProfileDetails } from "../../squashpoint";
import { updateGameApi } from "../../Services/GameService";
import { createSetApi } from "../../Services/SetService";
import { all } from "axios";

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

const isValidSquashSetScore = ({ player1, player2 }: SetScore): boolean => {
  const minScore = 11;
  const pointDifference = Math.abs(player1 - player2);

  if (player1 == minScore || player2 == minScore) {
    return pointDifference >= 2;
  }

  if (player1 >= minScore || player2 >= minScore) {
    return pointDifference == 2;
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
        ? setSetWinner(gameInfo.players[0].fullName, setIndex)
        : setSetWinner(gameInfo.players[1].fullName, setIndex);
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
              winner : {set.winner}
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
            gameScore.sets.filter(
              (s) => s.winner == gameInfo.players[0].fullName
            ).length
          }
          :{" "}
          {
            gameScore.sets.filter(
              (s) => s.winner == gameInfo.players[1].fullName
            ).length
          }
          {gameInfo.players[1].fullName}
        </div>
      )}
    </>
  );
};

export default GameOptions;
