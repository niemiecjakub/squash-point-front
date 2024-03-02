import axios from "axios";
import { handleError } from "../Helpers/ErrorHandler";
import { UserProfileToken } from "../Models/User";

export const loginApi = async (email: string, password: string) => {
  try {
    const response = await axios.post<UserProfileToken>("/Account/login", {
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
    const response = await axios.post<UserProfileToken>("/Account/register", {
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
