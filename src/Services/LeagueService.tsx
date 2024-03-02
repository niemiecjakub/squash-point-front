import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import {
  GameProfile,
  LeaguePlayerScoreboard,
  LeagueProfile,
} from "../squashpoint";

const api = "http://localhost:5110/api/League/";

export const leaguesGetApi = async () => {
  try {
    const data = await axios.get<LeagueProfile[]>(api + "all");
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const leagueGetByIdApi = async (id: string) => {
  try {
    const data = await axios.get<LeagueProfile>(api + id);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const leaguePlayersGetApi = async (id: string) => {
  try {
    const data = await axios.get<LeaguePlayerScoreboard[]>(
      api + `${id}/players`
    );
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const leagueGamesGetApi = async (id: string) => {
  try {
    const data = await axios.get<GameProfile[]>(api + `${id}/games`);
    return data;
  } catch (error) {
    handleError(error);
  }
};
