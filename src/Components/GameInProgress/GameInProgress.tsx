import React, { useEffect, useState } from "react";
import { createPointApi } from "../../Services/PointService";
import { createSetApi, updateSetApi } from "../../Services/SetService";
import { updateGameApi } from "../../Services/GameService";
import { GameDetails, GameState } from "../../Models/Game";
import { SetDetails } from "../../Models/Set";

interface Props {
    gameInfo: GameDetails;
    gameId: string;
}

const countPoints = (set: SetDetails, playerId: string) => {
    return set.points.filter((e) => e.winner.id === playerId).length;
};

const GameInProgress: React.FC<Props> = ({ gameInfo, gameId }) => {
    const [currentSetData, setCurrentSetData] = useState<GameState>({} as GameState);

    useEffect(() => {
        if (gameInfo.sets.length! > 0) {
            const { players, sets, player1Sets, player2Sets } = gameInfo!;
            const currentSet = sets[0];
            const player1Points = countPoints(currentSet, players[0].id);
            const player2Points = countPoints(currentSet, players[1].id);
            if (player2Points == 11 || player1Points == 11) {
                const winnerId = player1Points == 11 ? players[0].id : players[1].id;
                newSet(winnerId, currentSet.id);
                return;
            }
            if (player1Sets == 3 || player2Sets == 3) {
                const winnerId = player1Sets == 3 ? players[0].id : players[1].id;
                gameFinished(winnerId);
                return;
            }
            setCurrentSetData({
                setId: currentSet.id,
                player1Points,
                player2Points,
            });
        }
    }, []);

    const pointScored = async (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        winnerId: string,
        pointType: string
    ) => {
        // await createPointApi(currentSetData?.setId!, winnerId, pointType).then(() => getGameInfo());
    };

    const newSet = async (winnerId: string, setId: string) => {
        updateSetApi(setId, winnerId)
            .then(() => createSetApi(gameId))
            // .then(() => getGameInfo());
    };

    const gameFinished = async (playerId: string) => {
        // await updateGameApi(gameId, "Finished", playerId).then(() => getGameInfo());
    };

    return (
        <>
            <div className="flex flex-col items-center">
                <div className="text-3xl font-bold">
                    {currentSetData?.player1Points} : {currentSetData?.player2Points}
                </div>
                <div className="text-2xl">
                    {gameInfo.player1Sets} : {gameInfo.player2Sets}
                </div>
            </div>
            <div className="flex w-full justify-center">
                {gameInfo?.players.map(({ fullName, id }) => (
                    <button key={id} onClick={(e) => pointScored(e, id, "N")} className="bg-green-300 p-3 w-1/2 mx-1">
                        {fullName} +1 N
                    </button>
                ))}
            </div>

            <div className="flex w-full justify-center">
                {gameInfo.sets.map(({ id, winner, points }) => (
                    <div key={id} className="w-1/2">
                        <div>
                            set id: {id} __ points: {points.length}
                        </div>
                        {points.map(({ pointType, winner }, index) => (
                            <p key={index}>
                                {pointType} - {winner?.fullName}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default GameInProgress;
