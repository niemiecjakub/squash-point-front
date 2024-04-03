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
