import React from "react";
import { GameProfile } from "../../squashpoint";

interface Props {
  GameProfile: GameProfile;
}

const Game: React.FC<Props> = ({
  GameProfile: { players, status, date },
}: Props): JSX.Element => {
  return (
    <>
      <span>
        {" "}
        {players[0].fullName} vs {players[1].fullName} {status} schedule date:{" "}
        {date}
      </span>
    </>
  );
};

export default Game;
