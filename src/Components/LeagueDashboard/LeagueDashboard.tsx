import React, { useEffect, useState } from "react";
import { LeagueProfileInfo } from "../../squashpoint";
import { getLeagueDashboard } from "../../api";
import { useNavigate, useParams } from "react-router-dom";
import Player from "../Player/Player";
import { Link } from "react-router-dom";
import Game from "../Game/Game";

interface Props {}

const LeagueDashboard = (props: Props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [info, setInfo] = useState<LeagueProfileInfo>();

  useEffect(() => {
    const getLeagueInfo = async () => {
      try {
        const data = await getLeagueDashboard(id!);
        console.log(data)
        setInfo(data);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    getLeagueInfo();
  }, []);


  const handlePlayerClick = (id : number) => {
    navigate(`/player/${id}`);
  };

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
              {info.games.length > 0 ? (
                info.games.map((game) => {
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
