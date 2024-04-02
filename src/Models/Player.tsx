import { Game, GameFinished } from "./Game";

export interface Player {
    id: string;
    fullName: string;
    email: string;
    sex: string;
    photo: string;
}

export interface PlayerDetails extends Player {
    following: number;
    followers: number;
    friends: number;
}

export interface PlayerLeagueScore extends Player {
    score: number;
    gamesWon: number;
    gamesLost: number;
    gamesPlayed: number;
}

export interface PlayerGames {
    lastGames: GameFinished[];
    nextGames: Game[];
}

export interface PlayerGameStatistics {
    name: string;
    played: number;
    won: number;
    lost: number;
}
