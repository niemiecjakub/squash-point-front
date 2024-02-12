import axios from "axios";
import React, { useState } from "react";
import { NewGameFormState, PlayerProfile } from "../../squashpoint";

interface Props {
  players: PlayerProfile[];
  leagueId: number;
}

const NewLeagueGame: React.FC<Props> = ({
  leagueId,
  players,
}: Props): JSX.Element => {
  const [formData, setFormData] = useState<NewGameFormState>({
    leagueId: leagueId,
    player1Id: null,
    player2Id: null,
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
    day: new Date().getDate(),
    hour: new Date().getHours(),
    minute: new Date().getMinutes(),
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    if (name === "player1Id" || name === "player2Id") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: parseInt(value, 10) || null,
      }));
    } else {
      setFormData((prevData) => ({ ...prevData, [name]: parseInt(value, 10) }));
    }
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    try {
      console.log(formData);
      const response = await axios.post(
        "http://localhost:5110/api/Game",
        null,
        { params: formData }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-red-400 w-1/2">
      <div>
        <label htmlFor="player1">Player1</label>
        <br />
        <select
          id="player1"
          name="player1Id"
          onChange={handleChange}
          value={formData.player1Id || ""}
        >
          {players &&
            players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.firstName} {p.lastName} ({p.email})
              </option>
            ))}
        </select>
        <br />
      </div>

      <div>
        <label htmlFor="player2">Player2</label>
        <br />
        <select
          id="player2"
          name="player2Id"
          onChange={handleChange}
          value={formData.player2Id || ""}
        >
          {players &&
            players.map((p) => (
              <option key={p.id} value={p.id}>
                {p.firstName} {p.lastName} ({p.email})
              </option>
            ))}
        </select>
        <br />
      </div>

      <div>
        <label htmlFor="year">Year</label>
        <br />
        <input
          name="year"
          type="number"
          onChange={handleChange}
          value={formData.year}
        />
        <br />
      </div>

      <div>
        <label htmlFor="month">Month</label>
        <br />
        <input
          name="month"
          type="number"
          onChange={handleChange}
          value={formData.month}
        />
        <br />
      </div>

      <div>
        <label htmlFor="day">Day</label>
        <br />
        <input
          name="day"
          type="number"
          onChange={handleChange}
          value={formData.day}
        />
        <br />
      </div>

      <div>
        <label htmlFor="hour">Hour</label>
        <br />
        <input
          name="hour"
          type="number"
          onChange={handleChange}
          value={formData.hour}
        />
        <br />
      </div>

      <div>
        <label htmlFor="minute">Minute</label>
        <br />
        <input
          name="minute"
          type="number"
          onChange={handleChange}
          value={formData.minute}
        />
        <br />
      </div>

      <button type="submit" className="bg-green-200 p-2">
        Add player
      </button>
    </form>
  );
};

export default NewLeagueGame;
