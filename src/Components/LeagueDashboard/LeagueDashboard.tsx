import React, { useEffect, useState } from "react";
import { LeagueProfileDetails } from "../../squashpoint";
import { useNavigate, useParams } from "react-router-dom";
import Player from "../Player/Player";
import { Link } from "react-router-dom";
import Game from "../Game/Game";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";


const LeagueDashboard : React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leagueInfo, setLeagueInfo] = useState<LeagueProfileDetails>();
  const [ data, error, loading ] = useAxiosFetch({
    method: "GET",
    url: "/League/" + id,
  });

  useEffect(() => {
    if (data) {
      setLeagueInfo(data);
      console.log(data);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      console.log("getting league info...");
    }
  }, [loading]);


  const handlePlayerClick = (id : number) => {
    navigate(`/player/${id}`);
  };

  return (
    <div>
      {leagueInfo ? (
        <>
          <h1>{leagueInfo.name}</h1>
          <div className="bg-red-200">
            <h1>Players</h1>
            <ul>

              {leagueInfo.players.length > 0 ? (
                leagueInfo.players.map((player) => {
                  return (
                      <li onClick={() => handlePlayerClick(player.id)}>
                        <Player PlayerProfile={player}/>
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
              {leagueInfo.games.length > 0 ? (
                leagueInfo.games.map((game) => {
                  return (
                    <li>
                      <Game GameProfile={game}/>
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