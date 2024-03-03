import "react-datepicker/dist/react-datepicker.css";
import React, { useState } from "react";
import {
  LeaguePlayerScoreboard,
  NewGameFormState,
  PlayerProfile,
} from "../../squashpoint";
import DatePicker from "react-datepicker";
import { createNewGameApi } from "../../Services/GameService";
import { useAuth } from "../../Context/useAuth";

interface Props {
  players: PlayerProfile[];
  leagueId: string;
  className?: string;
}

const NewGame: React.FC<Props> = ({
  leagueId,
  players,
  className,
}: Props): JSX.Element => {
  const { user } = useAuth();
  const [formData, setFormData] = useState<NewGameFormState>({
    leagueId: leagueId,
    opponentId: "",
    date: new Date(),
  });

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    const { leagueId, opponentId, date } = formData;
    createNewGameApi(leagueId, opponentId, date);
  };

  return (
    <form onSubmit={handleSubmit} className={`${className} flex`}>
      <div>
        <select
          id="opponentId"
          name="opponentId"
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, opponentId: e.target.value }))
          }
          value={formData.opponentId}
        >
          <option>Select opponent</option>
          {players
            .filter((p) => p.id != user?.id)
            .map(({ id, fullName, email }) => (
              <option key={id} value={id}>
                {fullName} ({email})
              </option>
            ))}
        </select>
      </div>

      <DatePicker
        name="gameDate"
        selected={formData.date}
        onChange={(date) =>
          date && setFormData((prev) => ({ ...prev, date: date }))
        }
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="MMMM d, yyyy h:mm aa"
      />

      <button type="submit" className="bg-green-200 p-2">
        Add game
      </button>
    </form>
  );
};

export default NewGame;
