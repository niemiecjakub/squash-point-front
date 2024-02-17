import React from "react";
import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Props {
  className?: string;
}


const GameDashboard: React.FC<Props> = ({ className }: Props): JSX.Element => {
  return (
    <div className={`${className}`}>
      game dashboard
    </div>
  );
};

export default GameDashboard;
