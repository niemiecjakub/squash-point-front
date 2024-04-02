import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { League, LeagueDetail, LeagueEditInputs, LeagueGames } from "../Models/League";
import { PlayerLeagueScore } from "../Models/Player";

const api = "http://localhost:5110/api/League/";

export const leaguesGetApi = async () => {
    try {
        const data = await axios.get<League[]>(api + "all");
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const leagueGetByIdApi = async (leagueId: string) => {
    try {
        const data = await axios.get<LeagueDetail>(api + leagueId);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const leaguePlayersGetApi = async (leagueId: string) => {
    try {
        const data = await axios.get<PlayerLeagueScore[]>(api + `${leagueId}/players`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const leagueGamesGetApi = async (leagueId: string) => {
    try {
        const data = await axios.get<LeagueGames>(api + `${leagueId}/games`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const leagueJoinApi = async (leagueId: string) => {
    try {
        const data = await axios.post(api + "join", null, {
            params: {
                leagueId,
            },
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const leagueLeaveApi = async (leagueId: string) => {
    try {
        const response = await axios.delete(api + "leave", {
            params: {
                leagueId,
            },
        });
        return response.data;
    } catch (error) {
        handleError(error);
    }
};

export const leagueCreateApi = async (name: string) => {
    try {
        const data = await axios.post(api, null, {
            params: {
                name,
            },
        });
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const leagueEditApi = async (leagueId: string, leagueEdit: LeagueEditInputs) => {
    try {
        const image = leagueEdit.image.length > 0 ? leagueEdit.image[0] : null;
        const response = await axios.post(
            api + leagueId,
            { imageFile: image },
            {
                params: {
                    name: leagueEdit.name,
                    description: leagueEdit.description,
                    maxPlayers: leagueEdit.maxPlayers,
                    public: leagueEdit.public,
                },
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        return response;
    } catch (error) {
        handleError(`An error occurred while uploading the image: ${error}`);
    }
};
