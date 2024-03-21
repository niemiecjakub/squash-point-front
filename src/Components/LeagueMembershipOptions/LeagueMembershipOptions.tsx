import React, { MouseEventHandler } from "react";

interface Props {
    isUserJoined: boolean;
    isLoggedIn: boolean;
    className?: string;
    leagueJoin: MouseEventHandler<HTMLButtonElement>;
    leagueLeave: MouseEventHandler<HTMLButtonElement>;
}

const LeagueMembershipOptions: React.FC<Props> = ({ isUserJoined, isLoggedIn, className, leagueJoin, leagueLeave }) => {
    return isLoggedIn ? (
        <div className={`${className}`}>
            {isUserJoined ? (
                <button className="bg-red-300 p-2" onClick={leagueLeave}>
                    Leave league
                </button>
            ) : (
                <button className="bg-green-300 p-2" onClick={leagueJoin}>
                    Join league
                </button>
            )}
        </div>
    ) : (
        <div className={`${className} bg-red-100`}>please log in</div>
    );
};

export default LeagueMembershipOptions;
