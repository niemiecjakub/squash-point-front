import { create } from "zustand";
import { UserProfileToken, UserSocialProfile } from "../Models/User";

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
        set(() => ({ user, isLoggedIn }));
    },
}));
