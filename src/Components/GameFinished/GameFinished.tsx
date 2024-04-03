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
import { useQuery } from "react-query";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import SetInfoList from "../SetInfoLIist/SetInfoList";

interface Props {
    gameId: string;
    players: Player[];
}

const COLORS = ["#0088FE", "#00C49F"];

const getSetsSummary = (sets: SetSummary[]) => {
    return sets.map(({ player1, player2 }, i) => ({
        setNumber: `Set ${i + 1}`,
        [player1.fullName]: player1.points,
        [player2.fullName]: player2.points,
    }));
};

const getPieChartSummary = (sets: SetSummary[]) => {
    const summary = sets.reduce((accumulator, { player1, player2 }) => {
        accumulator[player1.fullName] = (accumulator[player1.fullName] || 0) + player1.points;
        accumulator[player2.fullName] = (accumulator[player2.fullName] || 0) + player2.points;
        return accumulator;
    }, {} as Record<string, number>);
    return Object.entries(summary).map(([name, value]) => ({ name, value }));
};

const GameFinished: React.FC<Props> = ({ gameId, players }: Props) => {
    const { data: gameInfo, isLoading: isGameInfoLoading } = useQuery({
        queryFn: () => gameSummaryGetByIdApi(gameId!),
        queryKey: ["gameSummary"],
    });

    return isGameInfoLoading ? (
        <LoadingSpinner />
    ) : (
        <>
            <SetInfoList sets={gameInfo?.sets!} />
            <div className="flex h-96 w-full mt-10">
                <div className="flex flex-col w-full h-full text-center">
                    <h1 className="my-4 text-2xl">Points by sets</h1>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            width={500}
                            height={400}
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
                </div>
                <div className="flex flex-col w-full h-full text-center">
                    <h1 className="my- text-2xl">Total points scored</h1>
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart width={400} height={400}>
                            <Legend />
                            <Pie
                                data={getPieChartSummary(gameInfo?.sets!)}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={110}
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
            </div>
        </>
    );
};

export default GameFinished;
