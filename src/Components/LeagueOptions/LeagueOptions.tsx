import React, { MouseEventHandler } from "react";

interface Props {
  isUserJoined: boolean;
  isLoggedIn: boolean;
  className?: string;
  leagueJoin: MouseEventHandler<HTMLButtonElement>;
  leagueLeave: MouseEventHandler<HTMLButtonElement>;
}

const LeagueOptions: React.FC<Props> = ({
  isUserJoined,
  isLoggedIn,
  className,
  leagueJoin,
  leagueLeave,
}) => {
  return isLoggedIn ? (
    <>
      {isUserJoined ? (
        <button className="bg-green-300 p-2" onClick={leagueJoin}>
          Join league
        </button>
      ) : (
        <button className="bg-red-300 p-2" onClick={leagueLeave}>
          Leave league
        </button>
      )}
    </>
  ) : (
    <div className="bg-red-100">please log in</div>
  );
};

export default LeagueOptions;
