import { useState } from "react";
import NewGameForm from "../NewGameForm/NewGameForm";
import Modal from "../Modal/Modal";
import LeagueEdit from "../LeagueEdit/LeagueEdit";
import { useNavigate } from "react-router-dom";
import Badge from "../Badge/Badge";
import Button from "../Button/Button";
import { useLeagueStore } from "../../Context/leagueStore";
import { leagueJoinApi, leagueLeaveApi } from "../../Services/LeagueService";
import { toast } from "react-toastify";
import { useMutation } from "react-query";
import { useUserStore } from "../../Context/userStore";

type Props = {
    leagueId: string;
    refetchInfo: () => void;
    refetchPlayers: () => void;
};

const LeagueInfo = ({ leagueId, refetchInfo, refetchPlayers }: Props) => {
    const navigate = useNavigate();
    const { isLoggedIn } = useUserStore();
    const [isNewGameOpen, setIsNewGameOpen] = useState<boolean>(false);
    const [isLegueEditOpen, setIsLegueEditOpen] = useState<boolean>(false);
    const {
        isUserJoined,
        leagueInfo: { description, maxPlayers, name, owner, photo, playerCount, public: isPublic },
        leagueGames,
    } = useLeagueStore((state) => state);

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

    const { mutateAsync: handleLeagueJoin } = useMutation({
        mutationFn: leagueJoinApi,
        onSuccess: () => {
            refetchInfo();
            refetchPlayers();
            toast.success(`Joined league ${name}`);
        },
    });

    const { mutateAsync: handleLeagueLeave } = useMutation({
        mutationFn: leagueLeaveApi,
        onSuccess: () => {
            refetchInfo();
            refetchPlayers();
            toast.warning(`Left league ${name}`);
        },
    });

    return (
        <>
            <div className="flex justify-between items-start text-xl my-4 mx-2 p-2 bg-white rounded-t-xl">
                <div className="flex items-start">
                    <img
                        className="h-32 w-32 rounded-full"
                        src={photo ? `data:image/png;base64,${photo} ` : `${process.env.PUBLIC_URL}` + "/league.png"}
                        alt="league image"
                        onClick={handleLeagueEditOpen}
                    />
                    <div className="flex-col">
                        <h1 className="text-2xl px-2 font-bold">{name}</h1>
                        {description && <h1 className="text-xl px-2">{description}</h1>}
                        <h1 className="text-xl px-2">
                            Players: {playerCount} / {maxPlayers}
                        </h1>
                    </div>
                </div>
                <div className="flex flex-col justify-between min-h-32">
                    <div className="flex">
                        {isPublic ? <Badge text="Public" color="green" /> : <Badge text="Private" color="red" />}
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
                        {isLoggedIn ? (
                            <>
                                {playerCount < maxPlayers && (
                                    <>
                                        {isUserJoined ? (
                                            <Button
                                                text="Leave"
                                                color="red"
                                                onClick={async () => await handleLeagueLeave(leagueId)}
                                            />
                                        ) : (
                                            <Button
                                                text="Join"
                                                color="green"
                                                onClick={async () => await handleLeagueJoin(leagueId)}
                                            />
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
                <NewGameForm leagueId={leagueId} />
            </Modal>
            <Modal isOpen={isLegueEditOpen} title="Edit league" onClose={handleLeagueEditClose} hasCloseBtn={true}>
                <LeagueEdit leagueId={leagueId} />
            </Modal>
        </>
    );
};

export default LeagueInfo;
