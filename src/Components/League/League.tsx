import React from "react";
import { LeagueProfile } from "../../squashpoint";

interface Props {
  LeagueProfile: LeagueProfile;
}

const League: React.FC<Props> = ( {LeagueProfile : {name}}: Props): JSX.Element => {
  return <div>{name}</div>;
};

export default League;
