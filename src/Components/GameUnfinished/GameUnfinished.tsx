import React, { useEffect, useState } from "react";
import { deleteGameApi } from "../../Services/GameService";
import { useNavigate } from "react-router";
import { GameDetails } from "../../Models/Game";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import Button from "../Button/Button";
import { SetScore } from "../../Models/Set";

interface Props {
    gameInfo: GameDetails;
    gameId: string;
}

const isValidSquashSetScore = (player1Score: number, player2Score: number): boolean => {
    const minScore = 11;
    const pointDifference = Math.abs(player1Score - player2Score);
    if (player1Score > minScore || player2Score > minScore) {
        return pointDifference == 2;
    }
    if (player1Score == minScore || player2Score == minScore) {
        return pointDifference >= 2;
    }
    return false;
};

const getSetWinner = ({ player1, player2 }: SetScore) => {
    return player1.score > player2.score ? player1.fullName : player2.fullName;
};

const getGameWinner = (setScore: SetScore[]) => {
    if (setScore.filter((s) => s.winner === s.player1.fullName).length === 3) {
        return setScore[0].player1.fullName;
    }
    if (setScore.filter((s) => s.winner === s.player2.fullName).length === 3) {
        return setScore[0].player2.fullName;
    }
    return null;
};

const isGameFinished = (setScore: SetScore[], setWinner: string) => {
    return setScore.filter((s) => s.winner === setWinner).length === 2;
};

//COMPONENT
const GameUnfinished: React.FC<Props> = ({ gameId, gameInfo }) => {
    const navigate = useNavigate();
    const { mutateAsync: handleDeleteGame, isLoading: isDeleteGameLoading } = useMutation({
        mutationFn: () => deleteGameApi(gameId!),
        onSuccess: () => {
            navigate(-1);
            toast.info("Game deleted");
        },
    });

    const initialSetScore = {
        isValid: false,
        winner: null,
        player1: {
            score: 0,
            id: gameInfo.players[0].id,
            fullName: gameInfo.players[0].fullName,
        },
        player2: {
            score: 0,
            id: gameInfo.players[1].id,
            fullName: gameInfo.players[1].fullName,
        },
    };
    const [gameScore, setGameScore] = useState<SetScore[]>([initialSetScore]);
    const [gameWinner, setGameWinner] = useState<string | null>(null);

    const handleScoreChange = (
        e: React.FormEvent<HTMLInputElement>,
        player: "player1" | "player2",
        setIndex: number
    ) => {
        const newScore = e.currentTarget.value;
        setGameScore((prevState) => {
            const newState = [...prevState];
            newState[setIndex] = {
                ...newState[setIndex],
                [player]: {
                    ...newState[setIndex][player],
                    score: newScore,
                },
            };
            return newState;
        });
    };

    const handleSetSubmit = (setIndex: number) => {
        const { player1, player2 } = gameScore[setIndex];
        const isValid = isValidSquashSetScore(player1.score, player2.score);
        const winner = isValid ? getSetWinner(gameScore[setIndex]) : null;

        setGameScore((prevState) => {
            const newState = [...prevState];
            newState[setIndex] = {
                ...newState[setIndex],
                isValid,
                winner,
            };
            return newState;
        });
        if (winner && isGameFinished(gameScore, winner)) {
            setGameWinner(winner);
            return;
        }
        isValid
            ? setGameScore((prevState) => [...prevState, initialSetScore])
            : toast.error("This is not valid set score");
    };

    const resetState = () => {
        setGameScore([initialSetScore]);
    };

    return (
        <div className="w-1/2">
            <div className="flex w-full bg-rose-300 justify-between">
                <h1>{gameInfo.players[0].fullName}</h1>
                <h1>{gameScore.filter(({ winner, player1 }) => winner === player1.fullName).length}</h1>
                <p>:</p>
                <h1>{gameScore.filter(({ winner, player2 }) => winner === player2.fullName).length}</h1>
                <h1>{gameInfo.players[1].fullName}</h1>
            </div>

            {gameWinner ? (
                <>
                    <h1>{gameWinner}</h1>
                    <div className="flex w-full justify-between">
                        {gameScore.map((set, index) => (
                            <div>
                                {set.player1.score} : {set.player2.score}
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <>
                    {gameScore.map(({ player1, player2, isValid, winner }, index) => (
                        <div key={index} className="flex flex-col w-full my-4">
                            <div className="flex justify-between">
                                <div className="flex items-center">
                                    <p>{player1.fullName}</p>
                                    <input
                                        disabled={isValid}
                                        type="number"
                                        defaultValue={0}
                                        min={0}
                                        onChange={(e) => handleScoreChange(e, "player1", index)}
                                    />
                                </div>
                                <div className="flex items-center">
                                    <input
                                        disabled={isValid}
                                        type="number"
                                        defaultValue={0}
                                        min={0}
                                        onChange={(e) => handleScoreChange(e, "player2", index)}
                                    />
                                    <p>{player2.fullName}</p>
                                </div>
                            </div>

                            {!isValid && (
                                <button className="w-full py-2 bg-blue-200" onClick={() => handleSetSubmit(index)}>
                                    submit
                                </button>
                            )}

                            {/* {isValid ? (
                        <p className="bg-green-300 p-4">OK - winner : {winner}</p>
                    ) : (
                        <p className="bg-red-300 p-4">this is not valid</p>
                    )} */}
                        </div>
                    ))}
                </>
            )}

            <Button
                text="Reset"
                color="yellow"
                className="w-full"
                disabled={isDeleteGameLoading}
                onClick={() => resetState()}
            />

            <Button
                text="Delete game"
                color="red"
                className="w-full"
                disabled={isDeleteGameLoading}
                onClick={async () => await handleDeleteGame()}
            />
            <Button text="Submit score" color="green" className="w-full" disabled={isDeleteGameLoading} />
        </div>
    );
};

export default GameUnfinished;
