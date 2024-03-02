import React from "react";
import axios from "axios";

interface Props {
  leagueId: number;
  className?: string;
}

const LeagueOptions: React.FC<Props> = ({ leagueId, className }) => {
  const handleLeagueJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await axios.post("/League/join", null, {
        params: {
          leagueId,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeagueLeave = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const response = await axios.post("/League/leave", null, {
        params: {
          leagueId,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <button className="bg-green-300 p-2" onClick={handleLeagueJoin}>
        Join league
      </button>
      <button className="bg-red-300 p-2" onClick={handleLeagueLeave}>
        Leave league
      </button>
    </>
  );
};

export default LeagueOptions;
