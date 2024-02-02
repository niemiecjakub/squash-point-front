import React from "react";
import { GameProfile } from "../../squashpoint";
import Player from "../Player/Player";

interface Props {
  GameProfile: GameProfile;
}

const Game: React.FC<Props> = ({
  GameProfile: { players, status },
}: Props): JSX.Element => {
  return (
    <>
      <Player PlayerProfile={players[0]} />
      vs
      <Player PlayerProfile={players[1]} />
      <p>{status}</p>
    </>
  );
};

export default Game;
