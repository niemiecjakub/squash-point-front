import React, { useEffect, useState } from "react";
import { GameSummary, PlayerProfile, SetSummary } from "../../squashpoint";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { gameSummaryGetByIdApi } from "../../Services/GameService";

interface Props {
  gameId: string;
  players: PlayerProfile[];
}

const getSetsSummary = (sets: SetSummary[]) => {
  return sets.map(({ player1, player2 }, i) => ({
    setNumber: i,
    [player1.fullName]: player1.points,
    [player2.fullName]: player2.points,
  }));
};

const GameFinished: React.FC<Props> = ({ gameId, players }: Props) => {
  const [gameInfo, setGameInfo] = useState<GameSummary>();
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getGameInfo().then((g) => console.log(g));
  }, []);

  const getGameInfo = async () => {
    setLoading(true);
    await gameSummaryGetByIdApi(gameId!).then((res) => {
      setGameInfo(res?.data!);
      setLoading(false);
    });
  };

  return (
    <>
      {loading ? (
        <p>Loading</p>
      ) : (
        <>
          <div>
            <p>League: {gameInfo?.league}</p>
            <p>Winner: {gameInfo?.winner}</p>
            <p>Status: {gameInfo?.status}</p>
            <div className="flex">
              {gameInfo?.sets.map(({ player1, player2, winner }) => (
                <p className="px-5">
                  {player1.points} : {player2.points}
                </p>
              ))}
            </div>
          </div>
          <div className="flex h-56 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={500}
                height={300}
                data={getSetsSummary(gameInfo?.sets!)}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="setNumber" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={`${players[0].fullName}`} fill="#8884d8" />
                <Bar dataKey={`${players[1].fullName}`} fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </>
  );
};

export default GameFinished;
