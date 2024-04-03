import React from "react";
import { SetSummary } from "../../Models/Set";

type Props = {
    sets: SetSummary[];
};

const SetInfoList = ({ sets }: Props) => {
    return (
        <div className="flex">
            {sets.map(({ player1, player2, winner }, i) => (
                <div className="flex flex-col items-center justify-center px-5 border-solid border-2 border-slate-500 mx-2">
                    <div className="flex items-center justify-center text-lg">
                        <span className={`${player1.fullName == winner && "font-bold"}`}>{player1.points}</span>
                        <span className="px-2">:</span>
                        <span className={`${player2.fullName == winner && "font-bold"}`}>{player2.points}</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SetInfoList;
