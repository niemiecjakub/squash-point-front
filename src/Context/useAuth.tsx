import { createContext, useEffect, useState } from "react";
import { UserProfile, UserSocialProfile } from "../Models/User";
import { useNavigate } from "react-router";
import { getUserSocialDataApi, loginApi, registerApi } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
  socialData: UserSocialProfile | null;
  token: string | null;
  registerUser: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    sex: string
  ) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
  getUserSocialData: (playerId: string) => void;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [socialData, setSocialData] = useState<UserSocialProfile | null>(null);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    if (user && token) {
      setUser(JSON.parse(user));
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);

  const registerUser = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    sex: string
  ) => {
    await registerApi(email, password, firstName, lastName, sex)
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response?.data.token);
          const userObj = {
            email: response.data.email,
            id: response.data.id,
            fullName: response.data.fullName,
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(response?.data.token);
          toast.success("Account successfully created");
          navigate("/login");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const getUserSocialData = async (userId: string) => {
    await getUserSocialDataApi(userId)
        .then((response) => {
            if (response) {
                const userSocialObj = {
                    following: response.data.following,
                    followers: response.data.followers,
                  };
                setSocialData(userSocialObj)
            }
        })
        .catch((e) => toast.warning("Server error occured"));
  }

  const loginUser = async (email: string, password: string) => {
    loginApi(email, password)
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response?.data.token);
          const userObj = {
            email: response.data.email,
            id: response.data.id,
            fullName: response.data.fullName,
          };
          getUserSocialData(response.data.id)
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(response?.data.token);
          setUser(userObj!);
          toast.success("Login successfull");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occured"));


  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    setToken("");
    toast.info("Logged out");
    navigate("/");
  };


  return (
    <UserContext.Provider
      value={{
        user,
        token,
        socialData,
        loginUser,
        registerUser,
        isLoggedIn,
        logout,
        getUserSocialData
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
