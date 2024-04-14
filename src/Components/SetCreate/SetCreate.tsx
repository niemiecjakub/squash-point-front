import React, { useState } from "react";
import { Player } from "../../Models/Player";

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

const getSetWinner = ({ player1, player2 }: SetState) => {
    return player1.score > player2.score ? player1 : player2;
};

type SetState = {
    player1: {
        id: string;
        score: number;
        fullName: string;
    };
    player2: {
        id: string;
        score: number;
        fullName: string;
    };
    winner: {
        id: string;
        fullName: string;
    } | null;
    isValid: boolean;
};

type Props = {
    setIndex: number;
    players: Player[];
};

const SetCreate = ({ setIndex, players }: Props) => {
    const [player1, player2] = players;
    const [setScore, setSetScore] = useState<SetState>({
        player1: {
            id: player1.id,
            fullName: player1.fullName,
            score: 0,
        },
        player2: {
            id: player2.id,
            fullName: player2.fullName,
            score: 0,
        },
        winner: null,
        isValid: false,
    } as SetState);

    const handleScoreChange = (e: React.FormEvent<HTMLInputElement>, player: "player1" | "player2") => {
        const newScore = e.currentTarget.value;
        setSetScore((prevState) => {
            return {
                ...prevState,
                [player]: {
                    ...prevState[player],
                    score: newScore,
                },
            };
        });
    };

    const handleSetSubmit = () => {
        const { player1, player2 } = setScore;
        const isValid = isValidSquashSetScore(player1.score, player2.score);
        const winner = getSetWinner(setScore);
        setSetScore((prevState) => {
            return {
                ...prevState,
                isValid,
                winner: winner,
            };
        });
    };

    return (
        <div>
            <p>Set: {setIndex + 1}</p>
            <div></div>
            {player1.fullName}
            <input type="number" min={0} onChange={(e) => handleScoreChange(e, "player1")} />
            :
            <input type="number" min={0} onChange={(e) => handleScoreChange(e, "player2")} />
            {player2.fullName}
            <br />
            <button className="w-full py-2 bg-blue-200" onClick={handleSetSubmit}>
                submit
            </button>
            {setScore.isValid ? (
                <p className="bg-green-300 p-4">OK - winner : {setScore.winner?.fullName}</p>
            ) : (
                <p className="bg-red-300 p-4">this is not valid</p>
            )}
        </div>
    );
};

export default SetCreate;
