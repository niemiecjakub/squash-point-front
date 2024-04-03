import React, { useEffect, useState } from "react";
import { createSetApi, updateSetApi } from "../../Services/SetService";
import { GameDetails, GameState } from "../../Models/Game";
import { SetDetails } from "../../Models/Set";
import { updateGameApi } from "../../Services/GameService";
import { useMutation } from "react-query";
import { createPointApi } from "../../Services/PointService";
import Button from "../Button/Button";

interface Props {
    gameInfo: GameDetails;
    gameId: string;
    refetchGameInfo: () => void;
}

const countPoints = (set: SetDetails, playerFullName: string) => {
    return set.points.filter((e) => e.winner === playerFullName).length;
};

const GameInProgress: React.FC<Props> = ({ gameInfo, gameId, refetchGameInfo }) => {
    const [currentSetData, setCurrentSetData] = useState<GameState>({} as GameState);

    useEffect(() => {
        if (gameInfo.sets.length! > 0) {
            const { players, sets, player1Sets, player2Sets } = gameInfo!;
            const currentSet = sets[0];
            const player1Points = countPoints(currentSet, players[0].fullName);
            const player2Points = countPoints(currentSet, players[1].fullName);
            if (player1Points == 60 || player2Points == 60) {
                const winnerId = player1Points == 60 ? players[0].id : players[1].id;
                handleSetFinished({ winnerId, setId: currentSet.id });
                return;
            }
            if (player1Sets == 3 || player2Sets == 3) {
                const winnerId = player1Sets == 3 ? players[0].id : players[1].id;
                handleGameFinished(winnerId);
                return;
            }
            setCurrentSetData({
                setId: currentSet.id,
                player1Points,
                player2Points,
            });
        } else {
            setCurrentSetData({ player1Points: 0, player2Points: 0 } as GameState);
        }
    }, [gameInfo, gameId]);

    //HANDLE POINT SCORED
    const { mutateAsync: handlePointScored, isLoading: isPointScoredLoading } = useMutation({
        mutationFn: ({ winnerId, pointType, setId }: any) => createPointApi(setId, winnerId, pointType),
        onSuccess: () => {
            refetchGameInfo();
        },
    });

    //GAME FINISHED
    const { mutateAsync: handleGameFinished, isLoading: isGameFinishedLoading } = useMutation({
        mutationFn: ({ gameId, winnerId, status }: any) => updateGameApi(gameId, status, winnerId),
        onSuccess: () => {
            refetchGameInfo();
        },
    });

    //SET FINISHED
    const { mutateAsync: handleSetFinished, isLoading: isSetFinishedLoading } = useMutation({
        mutationFn: ({ setId, winnerId }: any) => updateSetApi(setId, winnerId),
        onSuccess: () => {
            handleNewSet(gameId);
        },
    });

    const { mutateAsync: handleNewSet, isLoading: isNewSetLoading } = useMutation({
        mutationFn: (gameId: string) => createSetApi(gameId),
        onSuccess: () => {
            refetchGameInfo();
        },
    });

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
            <div className="flex flex-col  w-1/2">
                <div className="flex my-2">
                    {gameInfo?.players.map(({ fullName, id }) => (
                        <Button
                            className="w-full"
                            text={`${fullName} +1 N`}
                            disabled={isPointScoredLoading}
                            key={id}
                            onClick={async () =>
                                await handlePointScored({ setId: currentSetData.setId, winnerId: id, pointType: "N" })
                            }
                            color="green"
                        />
                    ))}
                </div>
                <div className="flex my-2">
                    {gameInfo?.players.map(({ fullName, id }) => (
                        <Button
                            className="w-full"
                            text={`${fullName} +1 P`}
                            disabled={isPointScoredLoading}
                            key={id}
                            onClick={async () =>
                                await handlePointScored({ setId: currentSetData.setId, winnerId: id, pointType: "P" })
                            }
                            color="yellow"
                        />
                    ))}
                </div>
                <div className="flex my-2">
                    {gameInfo?.players.map(({ fullName, id }) => (
                        <Button
                            className="w-full"
                            text={`${fullName} +1 S`}
                            disabled={isPointScoredLoading}
                            key={id}
                            onClick={async () =>
                                await handlePointScored({ setId: currentSetData.setId, winnerId: id, pointType: "S" })
                            }
                            color="red"
                        />
                    ))}
                </div>
            </div>

            <div className="flex w-full justify-center">
                {gameInfo.sets.map(({ id, winner, points }) => (
                    <div key={id} className="w-1/2">
                        <div>
                            set id: {id} __ points: {points.length}
                        </div>
                        {points.map(({ pointType, winner }, index) => (
                            <p key={index}>
                                {pointType} - {winner}
                            </p>
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

export default GameInProgress;
