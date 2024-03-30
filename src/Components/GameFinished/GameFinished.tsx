import React, { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from "recharts";
import { gameSummaryGetByIdApi } from "../../Services/GameService";
import { Player } from "../../Models/Player";
import { SetSummary } from "../../Models/Set";
import { GameSummary } from "../../Models/Game";

interface Props {
    gameId: string;
    players: Player[];
}

const getSetsSummary = (sets: SetSummary[]) => {
    return sets.map(({ player1, player2 }, i) => ({
        setNumber: i + 1,
        [player1.fullName]: player1.points,
        [player2.fullName]: player2.points,
    }));
};

const COLORS = ["#0088FE", "#00C49F"];

const getPieChartSummary = (sets: SetSummary[]) => {
    const summary = sets.reduce((accumulator, { player1, player2 }) => {
        accumulator[player1.fullName] = (accumulator[player1.fullName] || 0) + player1.points;
        accumulator[player2.fullName] = (accumulator[player2.fullName] || 0) + player2.points;
        return accumulator;
    }, {} as Record<string, number>);

    return Object.entries(summary).map(([name, value]) => ({ name, value }));
};

const GameFinished: React.FC<Props> = ({ gameId, players }: Props) => {
    const [gameInfo, setGameInfo] = useState<GameSummary>();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        getGameInfo();
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
                    <div className="flex h-80 w-full">
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
                                {players.map((player, i) => (
                                    <Bar dataKey={`${player.fullName}`} fill={`${COLORS[i]}`} />
                                ))}
                            </BarChart>
                        </ResponsiveContainer>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart width={400} height={400}>
                                <Legend />
                                <Pie
                                    data={getPieChartSummary(gameInfo?.sets!)}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={80}
                                    dataKey="value"
                                    label
                                >
                                    {getPieChartSummary(gameInfo?.sets!).map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index]} />
                                    ))}
                                </Pie>
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </>
            )}
        </>
    );
};

export default GameFinished;
