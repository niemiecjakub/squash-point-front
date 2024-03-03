import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5110/api/Point/";

export const createPointApi = async (
  setId: string,
  winnerId: string,
  pointType: string
) => {
  try {
    const data = await axios.post(api, null, {
      params: {
        SetId: setId,
        WinnerId: winnerId,
        PointType: pointType,
      },
    });
    return data;
  } catch (error) {
    handleError(error);
  }
};
