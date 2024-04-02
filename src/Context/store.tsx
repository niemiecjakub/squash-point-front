import { create } from "zustand";
import { LeagueDetail, LeagueGames } from "../Models/League";
import { PlayerLeagueScore } from "../Models/Player";

type LeagueStore = {
    isUserJoined: boolean;
    setIsUserJoined: (isUserJoined: boolean) => void;
    leagueInfo: LeagueDetail;
    setInfo: (leagueInfo: LeagueDetail) => void;
    leaguePlayers: PlayerLeagueScore[];
    setPlayers: (leaguePlayers: PlayerLeagueScore[]) => void;
    leagueGames: LeagueGames;
    setGames: (leagueGames: LeagueGames) => void;
};

export const useLeagueStore = create<LeagueStore>((set) => ({
    isUserJoined: false,
    setIsUserJoined: (isUserJoined) => set(() => ({ isUserJoined })),
    leagueInfo: {} as LeagueDetail,
    setInfo: (leagueInfo) => set(() => ({ leagueInfo })),
    leaguePlayers: [],
    setPlayers: (leaguePlayers) => set(() => ({ leaguePlayers })),
    leagueGames: {} as LeagueGames,
    setGames: (leagueGames) => set(() => ({ leagueGames })),
}));
