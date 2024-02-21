import React, { useEffect, useState } from "react";
import { PlayerProfile } from "../../squashpoint";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";
import axios from "axios";

interface Props {
  leagueId: number;
  className?: string;
  players?: PlayerProfile[];
}

const NewLeaguePlayer: React.FC<Props> = ({ leagueId, className, players }) => {
  const [selectedPlayerId, setSelectedPlayerId] = useState<number>();
  const [playerInfo, setPlayerInfo] = useState<PlayerProfile[]>();
  const [playerData, playerError, loadingPlayers] = useAxiosFetch({
    method: "GET",
    url: "/Player/player-list",
  });

  const handlePlayerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPlayerId(parseInt(e.target.value));
  };

  useEffect(() => {
    if (playerData) {
      setPlayerInfo(playerData);
    }
  }, [playerData]);

  const handleAddPlayer = async (e: React.MouseEvent<HTMLButtonElement>) => {
    console.log(`Adding player: ${selectedPlayerId}`);
    try {
      const response = await axios.post("/League/addPlayer", null, {
        params: {
          leagueId,
          playerId: selectedPlayerId,
        },
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form className={`${className}`}>
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
            playerInfo.map(({ fullName, email, id }) => (
              <option key={id} value={id}>
                {fullName}
              </option>
            ))}
        </select>
        <br />
      </div>
      <button className="bg-green-200 p-2" onClick={handleAddPlayer}>
        Add player
      </button>
    </form>
  );
};

export default NewLeaguePlayer;
