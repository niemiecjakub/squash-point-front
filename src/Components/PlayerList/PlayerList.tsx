import React, { useEffect, useState } from 'react'
import { PlayerProfile } from '../../squashpoint';
import { useAxiosFetch } from '../../Hooks/useAxiosFetch';
import Player from '../Player/Player';

const PlayerList: React.FC = () => {
  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [ data, error, loading, fetchData ] = useAxiosFetch({
    method: "GET",
    url: "/Player/player-list",
  });

  useEffect(() => {
    if (data) {
      setPlayers(data);
      console.log(data);
    } else {
      setPlayers([]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      console.log("retrieving players...");
    }
  }, [loading]);
  
  return (
    <div className='bg-red-300'>
      <h1 >Player List</h1>
      {loading && <p>loading...</p>}
        <ul>
          {players &&
            players.map((player, index) => (
              <li key={index} >
                <Player PlayerProfile={player} />
              </li>
            ))}
        </ul>
    </div>
  )
}

export default PlayerList;