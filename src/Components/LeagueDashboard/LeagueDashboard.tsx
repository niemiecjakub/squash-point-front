import React, { useEffect, useState } from "react";
import { LeagueProfileDetails, PlayerProfile } from "../../squashpoint";
import { useNavigate, useParams } from "react-router-dom";
import Player from "../Player/Player";
import Game from "../Game/Game";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";
import axios from "axios";
import NewLeagueGame from "../NewLeagueGame/NewLeagueGame";

const LeagueDashboard: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [leagueInfo, setLeagueInfo] = useState<LeagueProfileDetails>();
  const [leagueData, LeagueError, loadingLeague] = useAxiosFetch({
    method: "GET",
    url: "/League/" + id,
  });

  const [playerInfo, setPlayerInfo] = useState<PlayerProfile[]>();
  const [playerData, playerError, loadingPlayers] = useAxiosFetch({
    method: "GET",
    url: "/Player/player-list",
  });

  useEffect(() => {
    if (playerData) {
      setPlayerInfo(playerData);
    }
  }, [playerData]);

  useEffect(() => {
    if (leagueData) {
      setLeagueInfo(leagueData);
    }
  }, [leagueData]);

  const handlePlayerClick = (id: number) => {
    navigate(`/player/${id}`);
  };

  const [selectedPlayerId, setSelectedPlayerId] = useState<number>();
  const handlePlayerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlayerId(parseInt(e.target.value));
  };

  const handleAddPlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // e.preventDefault();
    console.log(`Adding player: ${selectedPlayerId}`);
    try {
      const response = await axios.post("/League/addPlayer", null, {
        params: {
          leagueId: id,
          playerId: selectedPlayerId,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="">
      {leagueInfo ? (
        <>
          <h1 className="text-xl py-3">League: {leagueInfo.name}</h1>
          <div className="flex justify-between">
            <div className="bg-red-200 w-1/2">
              <h1>Table</h1>
              <ul>
                {leagueInfo.players.length > 0 ? (
                  leagueInfo.players.map((player) => {
                    return (
                      <li
                        key={player.id}
                        onClick={() => handlePlayerClick(player.id)}
                      >
                        <Player PlayerProfile={player} />
                      </li>
                    );
                  })
                ) : (
                  <p> No players found</p>
                )}
              </ul>
            </div>
            <div className="bg-blue-200 w-1/2">
              <h1>Games</h1>
              <ul>
                {leagueInfo.games.length > 0 ? (
                  leagueInfo.games.map((game) => {
                    return (
                      <li key={game.id}>
                        <Game GameProfile={game} />
                      </li>
                    );
                  })
                ) : (
                  <p> No games found</p>
                )}
              </ul>
            </div>
          </div>
          <div className="flex justify-between">
          <form className="bg-green-500 w-1/2">
            <div>
              <label htmlFor="player">Player</label>
              <br />
              <select
                id="player"
                name="player"
                onChange={handlePlayerChange}
                value={selectedPlayerId}
              >
                {playerInfo &&
                  playerInfo.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.firstName} {p.lastName} ({p.email})
                    </option>
                  ))}
              </select>
              <br />
            </div>
            <button className="bg-red-200 p-2" onClick={handleAddPlayer}>
              Add player
            </button>
          </form>
          <NewLeagueGame players={leagueInfo.players} leagueId={parseInt(id || '0', 10)}/>
          </div>
        </>
      ) : (
        <div>League not found</div>
      )}
    </div>
  );
};

export default LeagueDashboard;
