import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserSocialProfile } from "../Models/User";
import { League } from "../Models/League";
import { Player, PlayerDetails, PlayerGames, PlayerStatistics } from "../Models/Player";

const api = "http://localhost:5110/api/Player/";

export const playersGetApi = async () => {
    try {
        const response = await axios.get<Player[]>(api + "all");
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const playerGetByIdApi = async (playerId: string) => {
    try {
        const response = await axios.get<PlayerDetails>(api + playerId);
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const playerLeaguesGetByIdApi = async (playerId: string) => {
    try {
        const response = await axios.get<League[]>(api + `${playerId}/leagues`);
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const playerGamesGetByIdApi = async (playerId: string) => {
    try {
        const response = await axios.get<PlayerGames>(api + `${playerId}/games`);
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const playerGamesOverviewGetByIdApi = async (playerId: string) => {
    try {
        const response = await axios.get<PlayerStatistics[]>(api + `${playerId}/games/overview`);
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const playerFollowersGetApi = async (playerId: string) => {
    try {
        const response = await axios.get<Player[]>(api + `${playerId}/followers`);
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const playerFollowingGetApi = async (playerId: string) => {
    try {
        const response = await axios.get<Player[]>(api + `${playerId}/followees`);
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const playerFriendsGetApi = async (playerId: string) => {
    try {
        const response = await axios.get<Player[]>(api + `${playerId}/friends`);
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const getUserSocialDataApi = async (playerId: string) => {
    try {
        const response = await axios.get<UserSocialProfile>(api + `${playerId}/social`);
        return response;
    } catch (error) {
        handleError(error);
    }
};
