import { TableColumn } from "react-data-table-component";
import { FinishedGameProfile, GameProfile, LeagueGameProfile, LeaguePlayerScoreboard, LeagueProfile, PlayerProfile } from "../squashpoint";

export const leagueGameTest: TableColumn<GameProfile>[] = [
    {
        cell: ({ date, league, players, winner }) => (
            <div className="flex w-full items-center justify-between">
                <div className="flex justify-start items-center w-1/3">
                    <img
                        data-tag="allowRowEvents"
                        className="h-10 rounded-full my-1"
                        src={
                            players[0].photo
                                ? `data:image/png;base64,${players[0].photo} `
                                : `${process.env.PUBLIC_URL}` + "/player.png"
                        }
                        alt="player photo"
                    />
                    <h1 className="text-lg ml-4" data-tag="allowRowEvents">
                        {players[0].fullName}
                    </h1>
                </div>

                <div className="flex-col">
                    <h1 className="text-md text-center" data-tag="allowRowEvents">
                        {date}
                    </h1>
                </div>

                <div className="flex justify-end items-center w-1/3">
                    <h1 className="text-lg mr-4" data-tag="allowRowEvents">
                        {players[1].fullName}
                    </h1>
                    <img
                        data-tag="allowRowEvents"
                        className="h-10 rounded-full my-1"
                        src={
                            players[1].photo
                                ? `data:image/png;base64,${players[1].photo} `
                                : `${process.env.PUBLIC_URL}` + "/player.png"
                        }
                        alt="player photo"
                    />
                </div>
            </div>
        ),
    },
];

export const playerPageUpcommingGamesColumns: TableColumn<GameProfile>[] = [
    {
        cell: ({ date, league, players, winner }) => (
            <div className="flex w-full items-center justify-between">
                <div className="flex justify-start items-center w-1/3">
                    <img
                        data-tag="allowRowEvents"
                        className="h-10 rounded-full my-1"
                        src={
                            players[0].photo
                                ? `data:image/png;base64,${players[0].photo} `
                                : `${process.env.PUBLIC_URL}` + "/player.png"
                        }
                        alt="player photo"
                    />
                    <h1 className="text-lg ml-4" data-tag="allowRowEvents">
                        {players[0].fullName}
                    </h1>
                </div>

                <div className="flex-col">
                    <h1 className="text-md text-center" data-tag="allowRowEvents">
                        {league}
                    </h1>
                    <h1 className="text-md text-center" data-tag="allowRowEvents">
                        {date}
                    </h1>
                </div>

                <div className="flex justify-end items-center w-1/3">
                    <h1 className="text-lg mr-4" data-tag="allowRowEvents">
                        {players[1].fullName}
                    </h1>
                    <img
                        data-tag="allowRowEvents"
                        className="h-10 rounded-full my-1"
                        src={
                            players[1].photo
                                ? `data:image/png;base64,${players[1].photo} `
                                : `${process.env.PUBLIC_URL}` + "/player.png"
                        }
                        alt="player photo"
                    />
                </div>
            </div>
        ),
    },
];

export const playerPageLastGamesGamesColumns: TableColumn<FinishedGameProfile>[] = [
    {
        cell: ({ league, players, winner }) => (
            <div className="flex w-full items-center justify-between">
                <div className="flex justify-start items-center w-1/3">
                    <img
                        data-tag="allowRowEvents"
                        className="h-10 rounded-full my-1"
                        src={
                            players[0].photo
                                ? `data:image/png;base64,${players[0].photo} `
                                : `${process.env.PUBLIC_URL}` + "/player.png"
                        }
                        alt="player photo"
                    />
                    <h1
                        className={`${winner == players[0].fullName ? "font-bold" : ""} placeholder:text-lg ml-4`}
                        data-tag="allowRowEvents"
                    >
                        {players[0].fullName}
                    </h1>
                </div>

                <div className="flex-col">
                    <h1 className="text-md text-center" data-tag="allowRowEvents">
                        {league}
                    </h1>
                    <h1 className="text-md text-center" data-tag="allowRowEvents">
                        {players[0].sets} : {players[1].sets}
                    </h1>
                </div>

                <div className="flex justify-end items-center w-1/3">
                    <h1
                        className={`${winner == players[1].fullName ? "font-bold" : ""} placeholder:text-lg mr-4`}
                        data-tag="allowRowEvents"
                    >
                        {players[1].fullName}
                    </h1>
                    <img
                        data-tag="allowRowEvents"
                        className="h-10 rounded-full my-1"
                        src={
                            players[1].photo
                                ? `data:image/png;base64,${players[1].photo} `
                                : `${process.env.PUBLIC_URL}` + "/player.png"
                        }
                        alt="player photo"
                    />
                </div>
            </div>
        ),
    },
];

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
                className="rounded-full my-1 h-10"
                src={photo ? `data:image/png;base64,${photo} ` : `${process.env.PUBLIC_URL}` + "/player.png"}
                alt="player photo"
            />
        ),
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
