import React, {useEffect, useState} from 'react'
import { PlayerProfile, PlayerProfileInfo } from '../../squashpoint';
import { useParams } from 'react-router-dom';
import { getPlayerDashboard } from '../../api';
import Player from '../Player/Player';
import League from '../League/League';
import Game from '../Game/Game';

type Props = {}

const PlayerDashboard = (props: Props) => {
  const { id } = useParams();
  const [playerInfo, setPlayerInfo] = useState<PlayerProfileInfo>();

  useEffect(() => {
    const getPlayerInfo = async () => {
      try {
        const data = await getPlayerDashboard(id!);
        console.log(data)
        setPlayerInfo(data);
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    getPlayerInfo();

  }, []);

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