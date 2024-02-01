import axios from "axios"
import { LeagueProfile, LeagueProfileInfo } from "./squashpoint"

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

export const getLeagueDashboard = async (query: string) => {
  try{
    const result = await axios.get<LeagueProfileInfo>(
      `${API_URL}/api/League/${query}`
    )
    return result.data
  } catch (error: any) {
    console.log("error message: ", error.message);
  }
}