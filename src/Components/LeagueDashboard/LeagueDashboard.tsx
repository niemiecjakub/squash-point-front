import React, { useEffect, useState } from "react";
import { LeagueProfileInfo } from "../../squashpoint";
import { getLeagueDashboard } from "../../api";
import { useParams } from "react-router-dom";

interface Props {}

const LeagueDashboard = (props: Props) => {
  const { id } = useParams();
  const [info, setInfo] = useState<LeagueProfileInfo>();

  useEffect(() => {
    const getLeagueInfo = async () => {
      try {
        const data = await getLeagueDashboard(id!);
        console.log(data);
        setInfo(data);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    getLeagueInfo();
  }, []);

  return (
    <div>
      {info ? (
        <>
          <h1>{info.name}</h1>
          <div className="bg-red-200">
            <h1>Players</h1>
            <ul>

              {info.players.length > 0 ? (
                info.players.map((player) => {
                  return (
                    <li>
                      {player.firstName} {player.lastName}
                    </li>
                  );
                })
              ) : (
                <p> No players found</p>
              )}
            </ul>
          </div>
          <div className="bg-blue-200">
            <h1>Games</h1>
            <ul>
              {info.games.length > 0 ? (
                info.games.map((game) => {
                  return (
                    <li>
                      {game.players[0].firstName} {game.players[0].lastName} vs{" "}
                      {game.players[1].firstName} {game.players[1].lastName}
                    </li>
                  );
                })
              ) : (
                <p> No games found</p>
              )}
            </ul>
          </div>
        </>
      ) : (
        <div>League not found</div>
      )}
    </div>
  );
};

export default LeagueDashboard;
