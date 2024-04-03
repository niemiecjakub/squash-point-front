import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { Game, GameDetails, GameSummary } from "../Models/Game";

const api = "http://localhost:5110/api/Game/";

export const gamesGetApi = async () => {
    try {
        const data = await axios.get<Game[]>(api + "all");
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const upcommingGamesGetApi = async () => {
    try {
        const data = await axios.get<Game[]>(api + "all", {
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
        const response = await axios.get<GameDetails>(api + id);
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const gameSummaryGetByIdApi = async (id: string) => {
    try {
        const response = await axios.get<GameSummary>(api + `${id}/summary`);
        return response.data;
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
