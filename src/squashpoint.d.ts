export interface LeagueProfile {
  id : number,
  name: string
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
  sex: string
}

export interface LeagueProfileInfo extends LeagueProfile {
  players: PlayerProfile[],
  games: GameProfile[]
}

export interface PlayerProfileInfo extends PlayerProfile {
  leagues: LeagueProfile[]
  games: GameProfile[],
}