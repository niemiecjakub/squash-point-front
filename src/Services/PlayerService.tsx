import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { PlayerProfile, PlayerProfileDetails } from "../squashpoint";

const api = "http://localhost:5110/api/Player/";

export const playersGetApi = async () => {
  try {
    const data = await axios.get<PlayerProfile[]>(api + "all");
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const playerGetByIdApi = async (id: string) => {
  try {
    const data = await axios.get<PlayerProfileDetails>(api + id);
    return data;
  } catch (error) {
    handleError(error);
  }
};
