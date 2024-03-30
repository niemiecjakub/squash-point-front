import { Game, GameFinished } from "./Game";

export interface League {
    id: string;
    name: string;
    owner: string;
    playerCount: number;
    description: string;
    public: boolean;
    maxPlayers: number;
}

export interface LeagueDetail extends League {
    photo: string;
}

export interface LeagueUpdate {
    name: string;
    description: string;
    maxPlayers: number;
    public: boolean;
    image: File | null;
}

export type LeagueEditInputs = {
    name: string;
    description: string;
    maxPlayers: number;
    public: boolean;
    image: FileList;
};

export interface LeagueGames {
    finishedGames: GameFinished[];
    upcommingGames: Game[];
    liveGames: Game[];
}
