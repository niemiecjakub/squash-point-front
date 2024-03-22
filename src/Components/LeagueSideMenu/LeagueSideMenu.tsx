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
                <h1 className="text-2xl px-2">League: {leagueInfo.name}</h1>
                <LeagueMembershipOptions
                    isUserJoined={isUserJoined}
                    isLoggedIn={isLoggedIn}
                    leagueLeave={handleLeaguLeave}
                    leagueJoin={handleLeagueJoin}
                    handleNewGameOpen={handleNewGameOpen}
                />

                <LeagueStatisticsOverview data={leagueInfo} />
            </div>
            <Modal isOpen={isNewGameOpen} title="New Game" onClose={handleNewGameClose} hasCloseBtn={true}>
                <NewGameForm players={leagueInfo.players} leagueId={leagueId} />
            </Modal>
        </>
    );
};

export default LeagueSideMenu;
