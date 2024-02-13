export interface LeagueProfile {
  id: number;
  name: string;
}

export interface GameProfile {
  id: number;
  status: string;
  date: string;
  winner: string | null;
  players: PlayerProfile[];
}

export interface PlayerProfile {
  id: number;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  sex: string;
}

export interface PlayerProfileDetails extends PlayerProfile {
  leagues: LeagueProfile[];
  games: GameProfile[];
}

export interface LeaguePlayerScoreboard extends PlayerProfile {
  score: number;
  gamesPlayed: number;
}

export interface LeagueProfileDetails extends LeagueProfile {
  players: LeaguePlayerScoreboard[];
  games: GameProfile[];
}

export interface GameProfileDetails extends GameProfile {
  sets: SetDetails[];
}

export interface SetDetails{
  winner: PlayerProfile| null;
  points: PointDetails[];
}

export interface PointDetails{
  winner: PlayerProfile | null;
  pointType: string;
}

export interface SignUpFormState {
  firstName: string;
  lastName: string;
  email: string;
  sex: string;
}

export interface NewGameFormState {
  leagueId: number;
  player1Id: number | null;
  player2Id: number | null;
  year: number;
  month: number;
  day: number;
  hour: number;
  minute: number;
}
