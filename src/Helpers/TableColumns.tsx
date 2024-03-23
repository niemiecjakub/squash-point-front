import { TableColumn } from "react-data-table-component";
import { GameProfile, LeagueGameProfile, LeaguePlayerScoreboard, LeagueProfile, PlayerProfile } from "../squashpoint";

export const gamesColumns: TableColumn<GameProfile>[] = [
    {
        name: "Players",
        selector: (row) => `${row.players[0].fullName} vs.${row.players[1].fullName}`,
        sortable: true,
    },
    {
        name: "Date",
        selector: (row) => row.date,
        sortable: true,
    },
    {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
    },
    {
        name: "League",
        selector: (row) => row.league,
        sortable: true,
    },
];

export const leaguesColumns: TableColumn<LeagueProfile>[] = [
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: "Owner",
        selector: (row) => row.owner,
        sortable: true,
    },
    {
        name: "Players",    
        selector: (row) => `${row.playerCount} / ${row.maxPlayers}`,
        sortable: true,
    },
];

export const leagueGamesColumns: TableColumn<LeagueGameProfile>[] = [
    {
        name: "League",
        selector: (row) => row.league.name,
        sortable: true,
    },
    {
        name: "Players",
        selector: (row) => `${row.players[0].fullName} vs.${row.players[1].fullName}`,
        sortable: true,
    },
    {
        name: "Date",
        selector: (row) => row.date,
        sortable: true,
    },
    {
        name: "Status",
        selector: (row) => row.status,
        sortable: true,
    },
    
];

export const playersColumns: TableColumn<PlayerProfile>[] = [
    {
        name: "Name",
        selector: (row) => row.fullName,
        sortable: true,
    },
];

export const scoreboardColumns: TableColumn<LeaguePlayerScoreboard>[] = [
    {
        name: "Score",
        selector: (row) => row.score,
        sortable: true,
    },
    {
        name: "Name",
        selector: (row) => row.fullName,
        sortable: true,
    },
    {
        name: "Games won",
        selector: (row) => row.gamesWon,
        sortable: true,
    },
    {
        name: "Games Lost",
        selector: (row) => row.gamesLost,
        sortable: true,
    },
    {
        name: "Games played",
        selector: (row) => row.gamesPlayed,
        sortable: true,
    },
];
