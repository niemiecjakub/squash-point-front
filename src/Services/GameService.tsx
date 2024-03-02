import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { GameProfile, GameProfileDetails, PlayerProfile } from "../squashpoint";

const api = "http://localhost:5110/api/Game/";

export const gamesGetApi = async () => {
  try {
    const data = await axios.get<GameProfile[]>(api + "all");
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const gameGetByIdApi = async (id: string) => {
  try {
    const data = await axios.get<GameProfileDetails>(api + id);
    return data;
  } catch (error) {
    handleError(error);
  }
};
