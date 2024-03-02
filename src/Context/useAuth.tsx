import { createContext, useEffect, useState } from "react";
import { UserProfile } from "../Models/User";
import { useNavigate } from "react-router";
import { loginApi, registerApi } from "../Services/AuthService";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";

type UserContextType = {
  user: UserProfile | null;
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
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<UserProfile | null>(null);
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
          };
          localStorage.setItem("user", JSON.stringify(userObj));
          setToken(response?.data.token);
          setUser(userObj!);
          toast.success("Login successfull");
          navigate("/");
        }
      })
      .catch((e) => toast.warning("Server error occured"));
  };

  const loginUser = async (email: string, password: string) => {
    await loginApi(email, password)
      .then((response) => {
        if (response) {
          localStorage.setItem("token", response?.data.token);
          const userObj = {
            email: response.data.email,
          };
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
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loginUser,
        registerUser,
        isLoggedIn,
        logout,
      }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const useAuth = () => React.useContext(UserContext);
