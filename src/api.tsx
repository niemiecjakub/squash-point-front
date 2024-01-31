import axios from "axios"
import { LeagueProfile } from "./squashpoint"

const API_URL = 'http://localhost:5110'

export const getLeagues = async () => {
  try{
    const result = await axios.get<LeagueProfile[]>(
      `${API_URL}/api/League`
    )
    return result.data
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
}