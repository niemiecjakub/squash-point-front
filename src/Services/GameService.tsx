import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { GameProfile, GameProfileDetails, GameSummary } from "../squashpoint";

const api = "http://localhost:5110/api/Game/";

export const gamesGetApi = async () => {
    try {
        const data = await axios.get<GameProfile[]>(api + "all");
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const upcommingGamesGetApi = async () => {
    try {
        const data = await axios.get<GameProfile[]>(api + "all", {
            params: {
                GameStatus: "Unfinished",
                OrderByScheduledDate: true,
            },
        });
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

export const gameSummaryGetByIdApi = async (id: string) => {
    try {
        const data = await axios.get<GameSummary>(api + `${id}/summary`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const updateGameApi = async (gameId: string, status: string, winnerId: string | null) => {
    try {
        const data = await axios.put(api + gameId, {
            status,
            winnerId,
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const createGameApi = async (leagueId: string, opponentId: string, date: Date) => {
    try {
        const data = await axios.post(api, null, {
            params: {
                leagueId,
                opponentId,
                date,
            },
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const deleteGameApi = async (gameId: string) => {
    try {
        const data = await axios.delete(api + gameId);
        return data;
    } catch (error) {
        handleError(error);
    }
};
