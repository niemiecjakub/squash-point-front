import React from "react";
import { GameDetails } from "../../Models/Game";

type Props = {
    gameInfo: GameDetails;
};

const GamePlayerBar = ({
    gameInfo: {
        date,
        league,
        players: [player1, player2],
        player1Sets,
        player2Sets,
        winner,
    },
}: Props) => {
    return (
        <div className="flex w-1/2 justify-between items-center text-center my-4 min-h-24">
            <div className="flex w-full items-center bg-slate-200 p-4 rounded-l-xl h-full">
                <img
                    className="h-16 rounded-full mx-5"
                    src={
                        player1.photo
                            ? `data:image/png;base64,${player1.photo} `
                            : `${process.env.PUBLIC_URL}` + "/player.png"
                    }
                    alt="player photo"
                />
                <h1 className="text-2xl">{player1.fullName}</h1>
            </div>
            <div className="w-full items-center justify-center bg-slate-300 p-4 min-h-24">
                <p className="text-lg">{league}</p>
                {winner ? (
                    <h1 className="text-3xl font-bold">
                        {player1Sets} : {player2Sets}
                    </h1>
                ) : (
                    <h1 className="text-xl font-bold">{date}</h1>
                )}
            </div>
            <div className="w-full items-center flex flex-row-reverse bg-slate-200 p-4 rounded-r-xl min-h-24">
                <img
                    className="h-16 rounded-full mx-5"
                    src={
                        player2.photo
                            ? `data:image/png;base64,${player2.photo} `
                            : `${process.env.PUBLIC_URL}` + "/player.png"
                    }
                    alt="player photo"
                />
                <h1 className="text-2xl">{player2.fullName}</h1>
            </div>
        </div>
    );
};

export default GamePlayerBar;
