import React from "react";
import { GameProfileDetails, SetDetails } from "../../squashpoint";

interface Props {
  gameInfo: GameProfileDetails;
}

const countPoints = (set: SetDetails, playerId: string) => {
  return set.points.filter((e) => e.winner.id === playerId).length;
};

const GameFinished: React.FC<Props> = ({ gameInfo }) => {
  return (
    <div>
      {gameInfo.players[0].fullName}
      {gameInfo.player1Sets} : {gameInfo.player2Sets}
      {gameInfo.players[1].fullName}
      {gameInfo.sets.map((s) => (
        <p>
          {countPoints(s, gameInfo.players[0].id)} :{" "}
          {countPoints(s, gameInfo.players[1].id)}
        </p>
      ))}
    </div>
  );
};

export default GameFinished;
