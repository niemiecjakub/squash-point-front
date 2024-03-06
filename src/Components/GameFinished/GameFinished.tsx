import React from "react";
import {
  GameProfileDetails,
  PlayerProfile,
  SetDetails,
} from "../../squashpoint";
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

interface Props {
  gameInfo: GameProfileDetails;
}
// const data = [
//   {
//     setNumber: "Set 1",
//     "Jakub Niemiec": 11,
//     "Piotr Wcislo": 4,
//     amt: 11,
//   },
//   {
//     setNumber: "Set 1",
//     "Jakub Niemiec": 5,
//     "Piotr Wcislo": 11,
//     amt: 11,
//   },
// ];

const countPoints = (set: SetDetails, playerId: string) => {
  return set.points.filter((e) => e.winner.id === playerId).length;
};

const getSetOverview = (
  setNumber: number,
  set: SetDetails,
  players: PlayerProfile[]
) => {
  return {
    setNumber: `Set ${setNumber}`,
    [players[0].fullName]: countPoints(set, players[0].id),
    [players[1].fullName]: countPoints(set, players[1].id),
  };
};

// const getSetPointOverview = ({ points }: SetDetails) => {
// const totalPoints = points.map(({ pointType, winner }) => ({
//   pointType,
//   winner: winner.fullName,
// }));

// console.log(points);
// };

const GameFinished: React.FC<Props> = ({
  gameInfo: {
    sets,
    players: [player1, player2],
    player1Sets,
    player2Sets,
  },
}) => {
  const data = sets.map((set, index) =>
    getSetOverview(index, set, [player1, player2])
  );

  console.log(data)

  return (
    <>
      <div>
        {player1.fullName}
        {player1Sets} : {player2Sets}
        {player2.fullName}
        {sets.map((s) => (
          <p>
            {countPoints(s, player1.id)} : {countPoints(s, player2.id)}
          </p>
        ))}
      </div>
      <div className="flex h-56 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
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
            <Bar dataKey={`${player1.fullName}`} fill="#8884d8" />
            <Bar dataKey={`${player2.fullName}`} fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default GameFinished;
