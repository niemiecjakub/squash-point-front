import { create } from "zustand";
import { UserProfileToken, UserSocialProfile } from "../Models/User";
import axios from "axios";

type UserStore = {
    user: UserProfileToken;
    socialData: UserSocialProfile;
    isLoggedIn: boolean;
    setSocialData: (social: UserSocialProfile) => void;
    setUser: (user: UserProfileToken, isLoggedIn: boolean) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    token: null,
    user: {} as UserProfileToken,
    socialData: {} as UserSocialProfile,
    isLoggedIn: false,
    setSocialData: (socialData) => set(() => ({ socialData })),
    setUser: (user, isLoggedIn) => {
        axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
        set(() => ({ user, isLoggedIn }));
    },
}));
