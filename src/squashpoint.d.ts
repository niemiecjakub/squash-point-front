export interface LeagueProfile {
  id : number,
  name: string
}

export interface LeagueProfileInfo {
  id : number,
  name: string
  players: PlayerProfile[],
  games: GamesProfile[]
}

export interface GamesProfile {
  id : number,
  players: PlayerProfile[]
}

export interface PlayerProfile {
  id : number,
  firstName: string,
  lastName: string,
  sex: string
}
