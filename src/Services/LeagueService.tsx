import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { GameProfile, LeaguePlayerScoreboard, LeagueProfile, LeagueProfileDetails } from "../squashpoint";
import { LeagueUpdate } from "../Models/League";

const api = "http://localhost:5110/api/League/";

export const leaguesGetApi = async () => {
    try {
        const data = await axios.get<LeagueProfile[]>(api + "all");
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const leagueGetByIdApi = async (leagueId: string) => {
    try {
        const data = await axios.get<LeagueProfileDetails>(api + leagueId);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const leaguePlayersGetApi = async (leagueId: string) => {
    try {
        const data = await axios.get<LeaguePlayerScoreboard[]>(api + `${leagueId}/players`);
        return data;
    } catch (error) {
        handleError(error);
    }
};

export const leagueGamesGetApi = async (leagueId: string) => {
    try {
        const data = await axios.get<GameProfile[]>(api + `${leagueId}/games`);
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
        const data = await axios.post(api + "leave", null, {
            params: {
                leagueId,
            },
        });
        return data;
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

export const leagueUpdateApi = async (leagueId: string, image: File | null, leagueInfo: LeagueUpdate) => {
    try {
        console.log(image);
        console.log(leagueInfo);
        // const response = await axios.put(
        //     api + leagueId,
        //     {
        //         imageFile: image,
        //         name: leagueInfo.name,
        //         description: leagueInfo.description,
        //         maxPlayers: leagueInfo.maxPlayers,
        //         public: leagueInfo.public,
        //     },
        //     {
        //         headers: {
        //             "Content-Type": "multipart/form-data",
        //         },
        //     }
        // );
        // return response;
    } catch (error) {
        handleError(`An error occurred while uploading the image: ${error}`);
    }
};
