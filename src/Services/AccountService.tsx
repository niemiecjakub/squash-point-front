import axios from "axios";
import { PlayerEditInputs, UserProfileToken } from "../Models/User";
import { handleError } from "../Helpers/ErrorHandler";

const api = "http://localhost:5110/api/Account/";

export const loginApi = async (email: string, password: string) => {
    try {
        const response = await axios.post<UserProfileToken>(api + "login", {
            email,
            password,
        });
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const registerApi = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    sex: string
) => {
    try {
        const response = await axios.post<UserProfileToken>(api + "register", {
            email,
            password,
            firstName,
            lastName,
            sex,
        });
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const followPlayerApi = async (playerId: string) => {
    try {
        const response = await axios.post(api + `follow`, null, {
            params: {
                playerId,
            },
        });
        return response;
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

export const sendFriendRequestApi = async (playerId: string) => {
    try {
        const response = await axios.post(api + `friend/request`, null, {
            params: {
                playerId,
            },
        });
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const acceptFriendRequestApi = async (playerId: string) => {
    try {
        const response = await axios.post(api + `friend/accept`, null, {
            params: {
                playerId,
            },
        });
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const deleteFriendApi = async (playerId: string) => {
    try {
        const response = await axios.delete(api + `friend/delete`, {
            params: { playerId },
        });
        return response;
    } catch (error) {
        handleError(error);
    }
};

export const playerEditApi = async (playerId: string, playerEdit: PlayerEditInputs) => {
    try {
        const image = playerEdit.image.length > 0 ? playerEdit.image[0] : null;
        const response = await axios.post(
            api + `${playerId}/photo`,
            { imageFile: image },
            {
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
