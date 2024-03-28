import React from "react";
import { GameProfile } from "../../squashpoint";

type Props = {
    game: GameProfile;
};

const GameItem = ({ game: { players, date, league, status, winner } }: Props) => {
    const [player1, player2] = players;
    return (
        <div className="my-3 bg-slate-100 flex justify-center flex-col items-center">
            <h1>
                {league}
            </h1>
            <div className="flex w-full items-center justify-center">
                <div className="flex w-1/3 justify-between items-center">
                    <img
                        className="h-12 rounded-full"
                        src={
                            player1.photo
                                ? `data:image/png;base64,${player1.photo} `
                                : `${process.env.PUBLIC_URL}` + "/player.png"
                        }
                        alt="player photo"
                    />
                    <h1>{player1.fullName}</h1>
                </div>
                <h1 className="px-6">{date}</h1>
                <div className="flex w-1/3 justify-between items-center">
                    <h1>{player2.fullName}</h1>
                    <img
                        className="h-12 rounded-full"
                        src={
                            player2.photo
                                ? `data:image/png;base64,${player2.photo} `
                                : `${process.env.PUBLIC_URL}` + "/player.png"
                        }
                        alt="player photo"
                    />
                </div>
            </div>
        </div>
    );
};

export default GameItem;
