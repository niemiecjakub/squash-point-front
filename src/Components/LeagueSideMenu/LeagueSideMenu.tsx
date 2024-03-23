import React, { useState } from "react";
import { LeagueProfileDetails } from "../../squashpoint";
import NewGameForm from "../NewGameForm/NewGameForm";
import LeagueMembershipOptions from "../LeagueMembershipOptions/LeagueMembershipOptions";
import { leagueJoinApi, leagueLeaveApi } from "../../Services/LeagueService";
import Modal from "../Modal/Modal";
import LeagueStatisticsOverview from "../LeagueStatisticsOverview/LeagueStatisticsOverview";

type Props = {
    leagueInfo: LeagueProfileDetails;
    leagueId: string;
    getLeagueInfo: () => void;
    isLoggedIn: boolean;
    isUserJoined: boolean;
};

const LeagueSideMenu = ({ isUserJoined, isLoggedIn, leagueInfo, leagueId, getLeagueInfo }: Props) => {
    const [isNewGameOpen, setIsNewGameOpen] = useState<boolean>(false);

    const handleLeagueJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        leagueJoinApi(leagueId).then(() => getLeagueInfo());
    };

    const handleLeaguLeave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        leagueLeaveApi(leagueId).then(() => getLeagueInfo());
    };

    const handleNewGameOpen = () => {
        setIsNewGameOpen(true);
    };

    const handleNewGameClose = () => {
        setIsNewGameOpen(false);
    };

    return (
        <>
            <div className="bg-white">
                <div className="flex items-center">
                    <img
                        className="h-32 w-32 rounded-full"
                        src="https://theme.zdassets.com/theme_assets/43400/87a1ef48e43b8cf114017e3ad51b801951b20fcf.jpg"
                        alt="league image"
                    />
                    <div className="flex-col ">
                        <h1 className="text-2xl px-2 font-bold">{leagueInfo.name}</h1>
                        {leagueInfo.description && <h1 className="text-xl px-2">{leagueInfo.description}</h1>}
                        <h1 className="text-xl px-2">
                            Players: {leagueInfo.playerCount} / {leagueInfo.maxPlayers}
                        </h1>
                    </div>
                </div>
                <h1 className="text-2xl px-2">Public: {leagueInfo.public ? "Yes" : "No"}</h1>
                <h1 className="text-2xl px-2">Total games played: {leagueInfo.games.filter(g => g.status == "Finished").length}</h1>
                <h1 className="text-2xl px-2">Upcomming games: {leagueInfo.games.filter(g => g.status == "Unfinished").length}</h1>
                <h1 className="text-2xl px-2">Live games: {leagueInfo.games.filter(g => g.status == "Started").length}</h1>

                <div className="flex-col items-center">
                    <LeagueMembershipOptions
                        isUserJoined={isUserJoined}
                        isLoggedIn={isLoggedIn}
                        leagueLeave={handleLeaguLeave}
                        leagueJoin={handleLeagueJoin}
                        canUserJoin={leagueInfo.playerCount < leagueInfo.maxPlayers ? true : false}
                    />
                    {isUserJoined && (
                        <button className="p-2 bg-blue-300 min-w-60 rounded-2xl" onClick={handleNewGameOpen}>
                            New game
                        </button>
                    )}
                    <LeagueStatisticsOverview data={leagueInfo} />
                </div>
            </div>
            <Modal isOpen={isNewGameOpen} title="New Game" onClose={handleNewGameClose} hasCloseBtn={true}>
                <NewGameForm players={leagueInfo.players} leagueId={leagueId} />
            </Modal>
        </>
    );
};

export default LeagueSideMenu;
