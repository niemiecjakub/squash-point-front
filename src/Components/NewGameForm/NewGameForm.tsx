import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import { createGameApi } from "../../Services/GameService";
import { toast } from "react-toastify";
import { useLeagueStore } from "../../Context/leagueStore";
import { useUserStore } from "../../Context/userStore";

type NewGameFormState = {
    leagueId: string;
    opponentId: string;
    date: Date;
};

interface Props {
    leagueId: string;
    className?: string;
}

const NewGameForm: React.FC<Props> = ({ leagueId, className }: Props): JSX.Element => {
    const { user } = useUserStore();
    const { leaguePlayers } = useLeagueStore((state) => state);
    const [formData, setFormData] = useState<NewGameFormState>({
        date: new Date(),
    } as NewGameFormState);

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        const { leagueId, opponentId, date } = formData;
        const currentDate = new Date();
        if (opponentId == "") {
            e.preventDefault();
            toast.error("Please select opponent");
            return;
        }
        if (date < currentDate) {
            e.preventDefault();
            toast.error("Past date cannot be selected");
            return;
        }
        createGameApi(leagueId, opponentId, date);
    };

    return (
        <form onSubmit={handleSubmit} className={`${className}`}>
            <div className="flex justify-between items-center pb-3 w-full">
                <p>Play vs. : </p>
                <select
                    className="ml-8 py-2 px-6 bg-slate-200 rounded-lg"
                    id="opponentId"
                    name="opponentId"
                    onChange={(e) => setFormData((prev) => ({ ...prev, opponentId: e.target.value }))}
                    value={formData.opponentId}
                >
                    <option>Select player</option>
                    {leaguePlayers &&
                        leaguePlayers.length > 0 &&
                        leaguePlayers
                            .filter((p) => p.id != user?.id)
                            .map(({ id, fullName }) => (
                                <option key={id} value={id}>
                                    {fullName}
                                </option>
                            ))}
                </select>
            </div>

            <div className="w-full">
                <DatePicker
                    name="gameDate"
                    selected={formData.date}
                    onChange={(date) => date && setFormData((prev) => ({ ...prev, date: date }))}
                    showTimeSelect
                    inline
                    timeFormat="HH:mm"
                    dateFormat="MMMM d, yyyy h:mm aa"
                />
            </div>
            <button type="submit" className="bg-green-200 rounded-full w-full py-2 my-2">
                Create game
            </button>
        </form>
    );
};

export default NewGameForm;
