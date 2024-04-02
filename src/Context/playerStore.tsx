import { create } from "zustand";
import { League } from "../Models/League";
import { PlayerDetails, PlayerGames, PlayerStatistics } from "../Models/Player";

type PlayerStore = {
    playerInfo: PlayerDetails;
    setInfo: (playerInfo: PlayerDetails) => void;
    playerLeagues: League[];
    setLeagues: (leagues: League[]) => void;
    playerGames: PlayerGames;
    setGames: (games: PlayerGames) => void;
    playerStatisctics: PlayerStatistics[];
    setPlayerStatisctics: (playerStatisctics: PlayerStatistics[]) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
    playerInfo: {} as PlayerDetails,
    setInfo: (playerInfo) => set(() => ({ playerInfo })),
    playerLeagues: [],
    setLeagues: (playerLeagues) => set(() => ({ playerLeagues })),
    playerGames: {} as PlayerGames,
    setGames: (playerGames) => set(() => ({ playerGames })),
    playerStatisctics: [],
    setPlayerStatisctics: (playerStatisctics) => set(() => ({ playerStatisctics })),
}));
