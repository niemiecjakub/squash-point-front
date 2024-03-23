import React, { MouseEventHandler } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
    isUserJoined: boolean;
    isLoggedIn: boolean;
    canUserJoin: boolean;
    className?: string;
    leagueJoin: MouseEventHandler<HTMLButtonElement>;
    leagueLeave: MouseEventHandler<HTMLButtonElement>;
}

const LeagueMembershipOptions: React.FC<Props> = ({
    isUserJoined,
    isLoggedIn,
    className,
    canUserJoin,
    leagueJoin,
    leagueLeave,
}) => {
    const navigate = useNavigate();
    const loginPageNavigate = () => {
        navigate("/login");
    };
    return isLoggedIn ? (
        <>
            {canUserJoin && (
                <>
                    {isUserJoined ? (
                        <>
                            <button className="bg-red-300 p-2 min-w-60 rounded-2xl" onClick={leagueLeave}>
                                Leave
                            </button>
                        </>
                    ) : (
                        <button className="bg-green-300 p-2 min-w-60 rounded-2xl" onClick={leagueJoin}>
                            Join
                        </button>
                    )}
                </>
            )}
        </>
    ) : (
        <button className={`${className} bg-red-300 p-2 min-w-60 rounded-2xl`} onClick={loginPageNavigate}>
            Log in to join
        </button>
    );
};

export default LeagueMembershipOptions;
