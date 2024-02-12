import React from "react";
import { GameProfile } from "../../squashpoint";
import Player from "../Player/Player";

interface Props {
  GameProfile: GameProfile;
}

const Game: React.FC<Props> = ({
  GameProfile: { players, status, date },
}: Props): JSX.Element => {
  return (
    <>
      <Player PlayerProfile={players[0]} />
      <span> vs </span> 
      <Player PlayerProfile={players[1]} />
      <span> {status} </span>
      <span> schedule date: {date} </span>
    </>
  );
};

export default Game;
