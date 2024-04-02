import { create } from "zustand";
import { UserSocialProfile } from "../Models/User";

type UserStore = {
    socialData: UserSocialProfile;
    setSocialData: (social: UserSocialProfile) => void;
};

export const useUserStore = create<UserStore>((set) => ({
    socialData: {} as UserSocialProfile,
    setSocialData: (socialData) => set(() => ({ socialData })),
}));
