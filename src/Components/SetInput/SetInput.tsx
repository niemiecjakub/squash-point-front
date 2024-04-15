import React, { useState } from "react";
import { SetScore } from "../../Models/Set";
import { Player } from "../../Models/Player";

type Props = {
    player1: Player;
    player2: Player;
    setIndex: number;
};

const SetInput = ({ player1, player2, setIndex }: Props) => {
    const [setScore, setSetScore] = useState<SetScore>({
        isValid: false,
        winner: null,
        player1: {
            score: 0,
            id: player1.id,
            fullName: player1.fullName,
        },
        player2: {
            score: 0,
            id: player2.id,
            fullName: player2.fullName,
        },
    });

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
        console.log(setScore);
    };
    return (
        <div key={setIndex} className="flex">
            <p>Set: {setIndex + 1}</p>
            <div></div>
            {player1.fullName}
            <input type="number" defaultValue={0} min={0} onChange={(e) => handleScoreChange(e, "player1")} />
            :
            <input type="number" defaultValue={0} min={0} onChange={(e) => handleScoreChange(e, "player2")} />
            {player2.fullName}
            <br />
            <button className="w-full py-2 bg-blue-200" onClick={handleSetSubmit}>
                submit
            </button>
            {setScore.isValid ? (
                <p className="bg-green-300 p-4">OK - winner : {setScore.winner}</p>
            ) : (
                <p className="bg-red-300 p-4">this is not valid</p>
            )}
        </div>
    );
};

export default SetInput;
