import React from "react";
import { LeagueProfileDetails } from "../../squashpoint";
import NewGame from "../NewGame/NewGame";
import LeagueOptions from "../LeagueOptions/LeagueOptions";
import { useAuth } from "../../Context/useAuth";
import { leagueJoinApi, leagueLeaveApi } from "../../Services/LeagueService";

type Props = {
    leagueInfo: LeagueProfileDetails;
    leagueId: string;
    getLeagueInfo: () => void;
};

const LeagueSideMenu = ({ leagueInfo, leagueId, getLeagueInfo }: Props) => {
    const { isLoggedIn, user } = useAuth();

    const handleLeagueJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        leagueJoinApi(leagueId).then(() => getLeagueInfo());
    };

    const handleLeaguLeave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        leagueLeaveApi(leagueId).then(() => getLeagueInfo());
    };

    return (
        <div className="bg-white">
            <h1 className="text-2xl px-2">League: {leagueInfo.name}</h1>
            <NewGame className="m-2 py-2 bg-blue-200" players={leagueInfo.players} leagueId={leagueId} />
            <LeagueOptions
                isUserJoined={leagueInfo.players.filter((p) => p.id == user?.id).length == 0}
                isLoggedIn={isLoggedIn()}
                className="m-2 py-2 bg-red-200"
                leagueLeave={handleLeaguLeave}
                leagueJoin={handleLeagueJoin}
            />
        </div>
    );
};

export default LeagueSideMenu;
