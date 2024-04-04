import React, { useState } from "react";
import { deleteGameApi, updateGameApi } from "../../Services/GameService";
import { createSetApi, updateSetApi } from "../../Services/SetService";
import { createPointApi } from "../../Services/PointService";
import { useNavigate } from "react-router";
import { GameDetails } from "../../Models/Game";
import { Player } from "../../Models/Player";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import Button from "../Button/Button";

interface SetScore {
    player1: number;
    player2: number;
    winner: string | null;
    isValid: boolean;
}

interface GameScore {
    sets: SetScore[];
}

interface Props {
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

const isValidSquashSetScore = (player1: number, player2: number): boolean => {
    const minScore = 11;
    const pointDifference = Math.abs(player1 - player2);

    if (player1 > minScore || player2 > minScore) {
        return pointDifference == 2;
    }

    if (player1 == minScore || player2 == minScore) {
        return pointDifference >= 2;
    }

    return false;
};

const getSetWinner = ({ player1, player2 }: any, players: Player[]) => {
    const isValid = isValidSquashSetScore(player1, player2);
    let winner = null;
    if (!isValid) {
        const [{ fullName: player1Name }, { fullName: player2Name }] = players;
        winner = player1 > player2 ? player1Name : player2Name;
    }

    return { winner, isValid };
};

const GameUnfinished: React.FC<Props> = ({ gameInfo, gameId }) => {
    const navigate = useNavigate();
    const [gameScore, setGameScore] = useState<GameScore>({
        sets: [{} as SetScore, {} as SetScore, {} as SetScore, {} as SetScore, {} as SetScore],
    } as GameScore);

    const handleScoreChange = (
        e: React.FormEvent<HTMLInputElement>,
        player: "player1" | "player2",
        setIndex: number
    ) => {
        const newPlayerScore = e.currentTarget.value;
        const opponent = player == "player1" ? "player2" : "player1";
        setGameScore((prevState) => {
            const newSets = [...prevState.sets];
            const opponentScore = newSets[setIndex][opponent];
            const { winner, isValid } = getSetWinner(
                { [player]: newPlayerScore, [opponent]: opponentScore },
                gameInfo.players
            );

            newSets[setIndex] = {
                ...newSets[setIndex],
                [player]: newPlayerScore,
                winner,
                isValid,
            };
            return { sets: newSets };
        });
    };

    const handleGameEnd = async () => {
        console.log(gameScore);
    };

    const { mutateAsync: handleDeleteGame, isLoading: isDeleteGameLoading } = useMutation({
        mutationFn: () => deleteGameApi(gameId!),
        onSuccess: () => {
            navigate(-1);
            toast.info("Game deleted");
        },
    });

    return (
        <>
            <div>
                {gameScore.sets.map((set, index) => (
                    <div key={index} className="flex">
                        <div>
                            <p>Set: {index + 1}</p>
                            {gameInfo.players[0].fullName} (
                            <input type="number" min={0} onChange={(e) => handleScoreChange(e, "player1", index)} />
                            :
                            <input type="number" min={0} onChange={(e) => handleScoreChange(e, "player2", index)} />)
                            {gameInfo.players[1].fullName}
                            <br />
                            winner : {gameInfo.players.filter((p) => set.winner == p.fullName)[0]?.fullName}
                        </div>
                        {set.isValid ? (
                            <p className="bg-green-300 p-4">OK</p>
                        ) : (
                            <p className="bg-red-300 p-4">this is not valid</p>
                        )}
                    </div>
                ))}
                <div className="bg-blue-200 py-4 text-center">
                    <span className="mx-4">{gameInfo.players[0].fullName}</span>
                    <span>{gameScore.sets.filter((s) => s.winner == gameInfo.players[0].fullName).length}</span>
                    <span className="px-2">-</span>
                    <span>{gameScore.sets.filter((s) => s.winner == gameInfo.players[1].fullName).length}</span>
                    <span className="mx-4">{gameInfo.players[1].fullName}</span>
                </div>
                <Button
                    text="Delete game"
                    color="red"
                    className="w-full"
                    disabled={isDeleteGameLoading}
                    onClick={async () => await handleDeleteGame()}
                />
                <Button
                    text="Submit score"
                    color="green"
                    className="w-full"
                    disabled={isDeleteGameLoading}
                    onClick={handleGameEnd}
                />
            </div>
        </>
    );
};

export default GameUnfinished;
