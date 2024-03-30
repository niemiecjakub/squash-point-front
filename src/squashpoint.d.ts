export interface LeagueProfile {
    id: string;
    name: string;
    owner: string;
    playerCount: number;
    description: string;
    public: boolean;
    maxPlayers: number;
}

export interface GameProfile {
    id: string;
    status: string;
    date: string;
    winner?: string | null;
    players: PlayerProfile[];
    league: string;
}

export interface FinishedGameProfile {
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

export interface LeagueGameProfile extends GameProfile {
    league: LeagueProfile;
}

export interface PlayerProfile {
    id: string;
    fullName: string;
    email: string;
    sex: string;
    photo: string;
}

export interface PlayerProfileDetails extends PlayerProfile {
    following: number;
    followers: number;
    friends: number;
}

export interface PlayerGames  {
    lastGames: FinishedGameProfile[];
    nextGames: GameProfile[];
}


export interface LeaguePlayerScoreboard extends PlayerProfile {
    score: number;
    gamesWon: number;
    gamesLost: number;
    gamesPlayed: number;
}

export interface LeagueProfileDetails extends LeagueProfile {
    photo: string;
}

export interface LeagueGames {
    finishedGames: FinishedGameProfile[];
    upcommingGames: GameProfile[];
    liveGames: GameProfile[];
}

export interface GameProfileDetails extends GameProfile {
    sets: SetDetails[];
    player1Sets?: number;
    player2Sets?: number;
    player1Points?: number;
    player2Points?: number;
}

export interface GameState {
    setId: string;
    player1Points: number;
    player2Points: number;
}

export interface SetDetails {
    id: string;
    winner: PlayerProfile | null;
    points: PointDetails[];
}

export interface PointDetails {
    winner: PlayerProfile;
    pointType: string;
}

export interface RegisterFormState {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    repeatPassword: string;
    sex: string;
}

export interface NewGameFormState {
    leagueId: string;
    opponentId: string;
    date: Date;
}

export interface GameSummary {
    id: string;
    league: string;
    winner: string;
    status: string;
    sets: SetSummary[];
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

export interface PlayerGamesOverview {
    data: StatisticsOverview[];
}

export interface StatisticsOverview {
    name: string;
    played: number;
    won: number;
    lost: number;
}
