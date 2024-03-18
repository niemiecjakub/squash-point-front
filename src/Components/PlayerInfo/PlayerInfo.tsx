import { useEffect, useState } from "react";
import { gamesColumns, leaguesColumns } from "../../Helpers/TableColumns";
import {
  GameProfile,
  LeagueProfile,
  PlayerProfileDetails,
} from "../../squashpoint";
import Table from "../Table/Table";
import { playerGetByIdApi } from "../../Services/PlayerService";
import { useNavigate } from "react-router-dom";

type Props = {
  playerId: string;
};

const PlayerInfo = ({ playerId }: Props) => {
  const navigate = useNavigate();
  const [playerInfo, setPlayerInfo] = useState<PlayerProfileDetails>();
  const [playerInfoLoading, setPlayerInfoLoading] = useState<boolean>(true);

  useEffect(() => {
    getPlayerInfo();
  }, []);

  const getPlayerInfo = () => {
    setPlayerInfoLoading(true);
    playerGetByIdApi(playerId!).then((res) => {
      setPlayerInfo(res?.data!);
    });
    setPlayerInfoLoading(false);
  };

  const handleLeagueClick = (row: LeagueProfile): void => {
    navigate(`/league/${row.id}`);
  };

  const handleGameClick = (row: GameProfile): void => {
    navigate(`/game/${row.id}`);
  };

  return (
    <>
      {playerInfo && (
        <>
          <h1 className="text-2xl my-4">Player: {playerInfo.fullName}</h1>
          <div className="flex">
            <Table
              className="w-1/2 mx-2"
              title="Leagues"
              data={playerInfo.leagues}
              loading={playerInfoLoading}
              onRowClicked={handleLeagueClick}
              columns={leaguesColumns}
            />
            <Table
              className="w-1/2 mx-2"
              title="Games"
              data={playerInfo.games}
              loading={playerInfoLoading}
              onRowClicked={handleGameClick}
              columns={gamesColumns}
            />
          </div>
        </>
      )}
    </>
  );
};

export default PlayerInfo;
