import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5110/api/Set/";

export const updateSetApi = async (setId: string, winnerId: string) => {
  try {
    const data = await axios.put(api + setId, {
      winnerId,
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createSetApi = async (gameId: string) => {
  try {
    const data = await axios.post(api, null, {
      params: {
        GameId: gameId,
        WinnerId: null,
      },
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
