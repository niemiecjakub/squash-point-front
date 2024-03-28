import { TableColumn } from "react-data-table-component";
import { GameProfile, LeagueGameProfile, LeaguePlayerScoreboard, LeagueProfile, PlayerProfile } from "../squashpoint";

export const playerPageLastGamesColumns: TableColumn<GameProfile>[] = [
    {
        name: "Date",
        selector: (row) => row.date,
    },
    {
        name: "Opposition",
        selector: (row) => row.players[1].fullName,
    },
    {
        name: "League",
        selector: (row) => row.league,
    },
    {
        name: "Winner",
        selector: (row) => row.winner!,
    },
];

export const playerPageNextGamesColumns: TableColumn<GameProfile>[] = [
    {
        name: "Date",
        selector: (row) => row.date,
    },
    {
        name: "Opposition",
        selector: (row) => row.players[1].fullName,
    },
    {
        name: "League",
        selector: (row) => row.league,
    },
];

export const playerPageLeaguesColumns: TableColumn<LeagueProfile>[] = [
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
    },
];

export const LeaguePageGamesColumns: TableColumn<GameProfile>[] = [
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

export const HomePageGamesColumns: TableColumn<GameProfile>[] = [
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
        cell: ({ photo }) => (
            <img
                className="rounded-full my-2"
                src={photo ? `data:image/png;base64,${photo} ` : `${process.env.PUBLIC_URL}` + "/player.png"}
                alt="player photo"
            />
        ),
        width: "72px",
    },
    {
        name: "Name",
        selector: (row) => row.fullName,
        sortable: true,
    },
];

export const scoreboardColumns: TableColumn<LeaguePlayerScoreboard>[] = [
    {
        cell: ({ photo }) => (
            <img
                className="rounded-full my-2"
                src={photo ? `data:image/png;base64,${photo} ` : `${process.env.PUBLIC_URL}` + "/player.png"}
                alt="player photo"
            />
        ),
        width: "72px",
    },
    {
        name: "Name",
        selector: (row) => row.fullName,
        sortable: true,
    },
    {
        name: "Score",
        selector: (row) => row.score,
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
