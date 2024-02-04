export interface LeagueProfile {
  id : number,
  name: string,
}

export interface GameProfile {
  id : number,
  status: string,
  players: PlayerProfile[]
}

export interface PlayerProfile {
  id : number,
  firstName: string,
  lastName: string,
  email: string,
  sex: string
}

export interface LeagueProfileDetails extends LeagueProfile {
  players: PlayerProfile[],
  games: GameProfile[]
}

export interface PlayerProfileDetails extends PlayerProfile {
  leagues: LeagueProfile[]
  games: GameProfile[],
}