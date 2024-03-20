import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import {
    LeagueProfile,
    PlayerGamesOverview,
    PlayerProfile,
    PlayerProfileDetails,
    StatisticsOverview,
} from "../squashpoint";

const api = "http://localhost:5110/api/Player/";

export const playersGetApi = async () => {
    try {
        const data = await axios.get<PlayerProfile[]>(api + "all");
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const playerGetByIdApi = async (playerId: string) => {
    try {
        const data = await axios.get<PlayerProfileDetails>(api + playerId);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const playerLeaguesGetByIdApi = async (playerId: string) => {
    try {
        const data = await axios.get<LeagueProfile[]>(api + `${playerId}/leagues`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const playerGamesOverviewGetByIdApi = async (playerId: string) => {
    try {
        const data = await axios.get<StatisticsOverview[]>(api + `${playerId}/games/overview`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const followPlayerApi = async (playerId: string) => {
    try {
        const data = await axios.post(api + `follow`, null, {
            params: {
                playerId,
            },
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const unfollowPlayerApi = async (playerId: string) => {
    try {
        const response = await axios.delete(api + `unfollow`, {
            params: { playerId },
        });
        return response;
    } catch (error) {
        handleError(error);
    }
};
