import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

// const api = "http://localhost:5167/api";

export const loginApi = async (email: string, passowrd: string) => {
  try {
    const response = await axios.post<UserProfileToken>("/Account/login", {
      email,
      passowrd,
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const registerApi = async (
  email: string,
  passowrd: string,
  firstName: string,
  lastName: string,
  sex: string
) => {
  try {
    const response = await axios.post<UserProfileToken>("/Account/register", {
      email,
      passowrd,
      firstName,
      lastName,
      sex,
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};
