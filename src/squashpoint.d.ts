export interface LeagueProfile {
  id: number;
  name: string;
}

export interface GameProfile {
  id: number;
  status: string;
  date: string;
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

export interface LeagueProfileDetails extends LeagueProfile {
  players: PlayerProfile[];
  games: GameProfile[];
}

export interface PlayerProfileDetails extends PlayerProfile {
  leagues: LeagueProfile[];
  games: GameProfile[];
}

export interface SignUpFormState {
  firstname: string;
  lastname: string;
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
