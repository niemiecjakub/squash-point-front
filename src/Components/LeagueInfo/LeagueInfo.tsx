import { useState } from "react";
import NewGameForm from "../NewGameForm/NewGameForm";
import Modal from "../Modal/Modal";
import LeagueEdit from "../LeagueEdit/LeagueEdit";
import { useNavigate } from "react-router-dom";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";
import { useAuth } from "../../Context/useAuth";
import { useLeagueStore } from "../../Context/store";
import { leagueJoinApi, leagueLeaveApi } from "../../Services/LeagueService";
import { toast } from "react-toastify";

type Props = {
    leagueId: string;
    refetchInfo: () => void;
    refetchPlayers: () => void;
};

const LeagueInfo = ({ leagueId,  refetchInfo, refetchPlayers }: Props) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useAuth();
    const [isNewGameOpen, setIsNewGameOpen] = useState<boolean>(false);
    const [isLegueEditOpen, setIsLegueEditOpen] = useState<boolean>(false);

    const { isUserJoined, leagueInfo, leagueGames, leaguePlayers } = useLeagueStore((state) => state);
    const handleNewGameOpen = () => {
        setIsNewGameOpen(true);
    };

    const handleNewGameClose = () => {
        setIsNewGameOpen(false);
    };

    const handleLeagueEditOpen = () => {
        setIsLegueEditOpen(true);
    };

    const handleLeagueEditClose = () => {
        setIsLegueEditOpen(false);
    };

    const loginPageNavigate = () => {
        navigate("/login");
    };

    const handleLeagueJoin = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await leagueJoinApi(leagueId);
        refetchInfo();
        refetchPlayers();
        toast.success(`Joined legue ${leagueInfo.name}`);
    };

    const handleLeagueLeave = async (e: React.MouseEvent<HTMLButtonElement>) => {
        await leagueLeaveApi(leagueId);
        refetchInfo();
        refetchPlayers();
        toast.warning(`Left league ${leagueInfo.name}`);
    };

    return (
        <>
            <div className="flex justify-between items-start text-xl my-4 mx-2 p-2 bg-white rounded-t-xl">
                <div className="flex items-start">
                    <img
                        className="h-32 w-32 rounded-full"
                        src={
                            leagueInfo.photo
                                ? `data:image/png;base64,${leagueInfo.photo} `
                                : `${process.env.PUBLIC_URL}` + "/league.png"
                        }
                        alt="league image"
                        onClick={handleLeagueEditOpen}
                    />
                    <div className="flex-col">
                        <h1 className="text-2xl px-2 font-bold">{leagueInfo.name}</h1>
                        {leagueInfo.description && <h1 className="text-xl px-2">{leagueInfo.description}</h1>}
                        <h1 className="text-xl px-2">
                            Players: {leagueInfo.playerCount} / {leagueInfo.maxPlayers}
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col justify-between min-h-32">
                    <div className="flex">
                        {leagueInfo.public ? (
                            <Badge text="Public" color="green" />
                        ) : (
                            <Badge text="Private" color="red" />
                        )}
                        {leagueGames.finishedGames && (
                            <Badge text={`${leagueGames.finishedGames.length} games`} color="yellow" />
                        )}
                        {leagueGames.upcommingGames && (
                            <Badge text={`${leagueGames.upcommingGames.length} upcomming`} color="yellow" />
                        )}
                        {leagueGames.liveGames && <Badge text={`${leagueGames.liveGames.length} live`} color="red" />}
                    </div>
                    <div className="flex justify-end">
                        {isUserJoined && <Button text="New game" color="yellow" onClick={handleNewGameOpen} />}
                        {isLoggedIn() ? (
                            <>
                                {leagueInfo.playerCount < leagueInfo.maxPlayers && (
                                    <>
                                        {isUserJoined ? (
                                            <Button text="Leave" color="red" onClick={handleLeagueLeave} />
                                        ) : (
                                            <Button text="Join" color="green" onClick={handleLeagueJoin} />
                                        )}
                                    </>
                                )}
                            </>
                        ) : (
                            <Button text="Log in to join" color="red" onClick={loginPageNavigate} />
                        )}
                    </div>
                </div>
            </div>
            <Modal isOpen={isNewGameOpen} title="New Game" onClose={handleNewGameClose} hasCloseBtn={true}>
                <NewGameForm leagueId={leagueId} players={leaguePlayers} />
            </Modal>
            <Modal isOpen={isLegueEditOpen} title="Edit league" onClose={handleLeagueEditClose} hasCloseBtn={true}>
                <LeagueEdit leagueId={leagueId} leagueInfo={leagueInfo} />
            </Modal>
        </>
    );
};

export default LeagueInfo;
