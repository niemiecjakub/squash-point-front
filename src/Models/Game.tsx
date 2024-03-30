import { Player } from "./Player";
import { SetDetails, SetSummary } from "./Set";

export interface Game {
    id: string;
    status: string;
    date: string;
    winner?: string | null;
    players: Player[];
    league: string;
}

export interface GameDetails extends Game {
    sets: SetDetails[];
    player1Sets?: number;
    player2Sets?: number;
    player1Points?: number;
    player2Points?: number;
}

export interface GameFinished {
    id: string;
    league: string;
    winner?: string | null;
    status: string;
    players: {
        fullName: string;
        sets: number;
        photo?: string;
    }[];
}

export interface GameState {
    setId: string;
    player1Points: number;
    player2Points: number;
}

export interface GameSummary {
    id: string;
    league: string;
    winner: string;
    status: string;
    sets: SetSummary[];
}
