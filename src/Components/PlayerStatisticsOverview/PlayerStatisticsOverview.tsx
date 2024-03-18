import React from "react";
import { Legend, PieChart, ResponsiveContainer, Pie, Cell } from "recharts";

type Props = {
  name: string;
  data: { name: string; value: number }[];
  colors: string[];
};

const PlayerStatisticsOverview = ({ data, name, colors }: Props) => {
  return (
    <>
      <h1>{name}</h1>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart width={400} height={400}>
          <Legend />
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
            label
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={colors[index % colors.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};

export default PlayerStatisticsOverview;
