import { Player } from "./Player";
import { PointDetails } from "./Point";

export interface SetDetails {
    id: string;
    winner: string | null;
    points: PointDetails[];
}

export interface SetSummary {
    id: number;
    createdAt: string;
    winner: string;
    player1: PlayerSetPoint;
    player2: PlayerSetPoint;
}

export interface PlayerSetPoint {
    fullName: string;
    points: number;
}

export interface SetScore {
    player1: { id: string; score: number; fullName: string };
    player2: { id: string; score: number; fullName: string };
    winner: string | null;
    isValid: boolean;
}

export interface GameScore {
    sets: SetScore[];
}
