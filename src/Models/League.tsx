export interface LeagueUpdate {
    name: string;
    description: string;
    maxPlayers: number;
    public: boolean;
    image: File | null;
}

export type LeagueEditInputs = {
    name: string;
    description: string;
    maxPlayers: number;
    public: boolean;
    image: FileList;
};
