import React, { useEffect, useState } from "react";
import { deleteGameApi } from "../../Services/GameService";
import { useNavigate } from "react-router";
import { GameDetails } from "../../Models/Game";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import Button from "../Button/Button";
import { GameScore, SetScore } from "../../Models/Set";
import { Player } from "../../Models/Player";
import SetInput from "../SetInput/SetInput";

interface Props {
    player1: Player;
    player2: Player;
    gameInfo: GameDetails;
    gameId: string;
}

const getGameWinner = ({ sets }: GameScore, players: Player[]): Player | null => {
    const [{ id: player1Id }, { id: player2Id }] = players;
    const player1SetsWon = sets.filter(({ winner }) => winner === player1Id).length;
    const player2SetsWon = sets.filter(({ winner }) => winner === player2Id).length;

    if (player1SetsWon >= 3 && player2SetsWon < 3) {
        return players[0];
    } else if (player2SetsWon >= 3 && player1SetsWon < 3) {
        return players[1];
    } else {
        return null;
    }
};

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
    return player1.score > player2.score ? "player1" : "player2";
};

//COMPONENT
const GameUnfinished: React.FC<Props> = ({ gameId, player1, player2 }) => {
    const navigate = useNavigate();
    const { mutateAsync: handleDeleteGame, isLoading: isDeleteGameLoading } = useMutation({
        mutationFn: () => deleteGameApi(gameId!),
        onSuccess: () => {
            navigate(-1);
            toast.info("Game deleted");
        },
    });

    const [gameScore, setGameScore] = useState(Array.from({ length: 1 }));

    const handleSetAdd = () => {
        setGameScore((prevState) => [...prevState, {}]);
    };

    return (
        <div>
            {gameScore.map((set, index) => (
                <SetInput key={index} player1={player1} player2={player2} setIndex={index} />
            ))}

            <button onClick={handleSetAdd}>Add Set</button>
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
