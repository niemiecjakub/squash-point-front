import { TableColumn } from "react-data-table-component";
import { League } from "../Models/League";
import { Game, GameFinished } from "../Models/Game";
import { Player, PlayerLeagueScore } from "../Models/Player";

export const leagueGameTest: TableColumn<Game>[] = [
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

export const playerPageUpcommingGamesColumns: TableColumn<Game>[] = [
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

export const playerPageLastGamesGamesColumns: TableColumn<GameFinished>[] = [
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
                        className={`${winner == players[0].fullName ? "font-bold" : ""} text-lg ml-4`}
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
                        className={`${winner == players[1].fullName ? "font-bold" : ""} text-lg mr-4`}
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

export const playerPageLastGamesColumns: TableColumn<Game>[] = [
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

export const playerPageNextGamesColumns: TableColumn<Game>[] = [
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

export const playerPageLeaguesColumns: TableColumn<League>[] = [
    {
        name: "Name",
        selector: (row) => row.name,
        sortable: true,
    },
];

export const LeaguePageGamesColumns: TableColumn<Game>[] = [
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

export const HomePageGamesColumns: TableColumn<Game>[] = [
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

export const leaguesColumns: TableColumn<League>[] = [
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

export const leagueGamesColumns: TableColumn<Game>[] = [
    {
        name: "League",
        selector: (row) => row.league,
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

export const playersColumns: TableColumn<Player>[] = [
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

export const scoreboardColumns: TableColumn<PlayerLeagueScore>[] = [
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
