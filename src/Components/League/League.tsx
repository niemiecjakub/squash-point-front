import React from "react";
import { LeagueProfile } from "../../squashpoint";
import { Link } from "react-router-dom";

interface Props {
  LeagueProfile: LeagueProfile;
}

const League: React.FC<Props> = ({
  LeagueProfile: { name, id },
}: Props): JSX.Element => {
  return (
    <div>
      <Link to={`/league/${id}`}>{name}</Link>
    </div>
  );
};

export default League;
