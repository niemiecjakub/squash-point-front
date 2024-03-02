import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

const api = "http://localhost:5110/api/Account/";

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post<UserProfileToken>(api + "login", {
      email,
      password,
    });
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
