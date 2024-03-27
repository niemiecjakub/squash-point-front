import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken, UserSocialProfile } from "../Models/User";

const accountApi = "http://localhost:5110/api/Account/";
const playerApi = "http://localhost:5110/api/Player/";

export const loginApi = async (email: string, password: string) => {
    try {
        const response = await axios.post<UserProfileToken>(accountApi + "login", {
            email,
            password,
        });
        console.log(response);
        return response;
    } catch (error) {
        console.log(error);
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
        const response = await axios.post<UserProfileToken>(accountApi + "register", {
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

export const getUserSocialDataApi = async (playerId: string) => {
    try {
        const response = await axios.get<UserSocialProfile>(playerApi + `${playerId}/social`);
        return response;
    } catch (error) {
        handleError(error);
    }
};
