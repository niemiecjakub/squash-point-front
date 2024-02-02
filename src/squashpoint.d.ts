export interface LeagueProfile {
  id : number,
  name: string
}

export interface GameProfile {
  id : number,
  players: PlayerProfile[]
}

export interface PlayerProfile {
  id : number,
  firstName: string,
  lastName: string,
  sex: string
}

export interface LeagueProfileInfo {
  id : number,
  name: string
  players: PlayerProfile[],
  games: GameProfile[]
}

export interface PlayerProfileInfo {
  id : number,
  firstName: string,
  lastName: string,
  sex: string
  leagues: LeagueProfile[]
  games: GameProfile[],
}