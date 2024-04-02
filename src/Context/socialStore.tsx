import { create } from "zustand";

type SocialStore = {
    isFollowing: boolean;
    setIsFollowing: (b: boolean) => void;
    isFriend: boolean;
    setIsFriend: (b: boolean) => void;
    isFriendRequestSent: boolean;
    setIsFriendRequestSent: (b: boolean) => void;
    isFriendRequestReceived: boolean;
    setIsFriendRequestReceived: (b: boolean) => void;
};

export const useSoicialStore = create<SocialStore>((set) => ({
    isFollowing: false,
    setIsFollowing: (isFollowing) => set(() => ({ isFollowing })),
    isFriend: false,
    setIsFriend: (isFriend) => set(() => ({ isFriend })),
    isFriendRequestSent: false,
    setIsFriendRequestSent: (isFriendRequestSent) => set(() => ({ isFriendRequestSent })),
    isFriendRequestReceived: false,
    setIsFriendRequestReceived: (isFriendRequestReceived) => set(() => ({ isFriendRequestReceived })),
}));
