import React from "react";
import { PlayerProfile } from "../../squashpoint";

interface Props {
  PlayerProfile: PlayerProfile;
}

const Player: React.FC<Props> = ({
  PlayerProfile: { firstName, lastName},
}: Props): JSX.Element => {
  return (
    <span>
      {firstName} {lastName}
    </span>
  );
};

export default Player;
