import React, {useEffect, useState} from 'react'
import { PlayerProfileDetails } from '../../squashpoint';
import { useParams } from 'react-router-dom';
import Player from '../Player/Player';
import League from '../League/League';
import Game from '../Game/Game';
import { useAxiosFetch } from '../../Hooks/useAxiosFetch';

type Props = {}

const PlayerDashboard = (props: Props) => {
  const { id } = useParams();
  const [playerInfo, setPlayerInfo] = useState<PlayerProfileDetails>();
  const [ data, error, loading ] = useAxiosFetch({
    method: "GET",
    url: "/Player/" + id,
  });

  useEffect(() => {
    if (data) {
      setPlayerInfo(data);
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
      console.log("getting player info...");
    }
  }, [loading]);

  return (
    <div>
      {playerInfo? (
        <>
          <p>{playerInfo.firstName} {playerInfo.lastName}</p>
          <div className="bg-red-200">
            <h1>Leagues</h1>
            <ul>
              {playerInfo.leagues.length > 0 ? (
                playerInfo.leagues.map((league) => {
                  return (
                      <li>
                        <League LeagueProfile={league}/>
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
              {playerInfo.games.length > 0 ? (
                playerInfo.games.map((game) => {
                  return (
                      <li>
                        <Game GameProfile={game}/>
                      </li>
                  );
                })
              ) : (
                <p> No players found</p>
              )}
            </ul>
          </div>

        </>
      ):(
        <div>
          no data
        </div>
      )}
    </div>
  );
}

export default PlayerDashboard