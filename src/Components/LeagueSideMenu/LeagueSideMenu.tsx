import React, { useState } from "react";
import { LeagueProfileDetails } from "../../squashpoint";
import NewGameForm from "../NewGameForm/NewGameForm";
import LeagueMembershipOptions from "../LeagueMembershipOptions/LeagueMembershipOptions";
import { leagueJoinApi, leagueLeaveApi, leagueEditApi } from "../../Services/LeagueService";
import Modal from "../Modal/Modal";
import LeagueStatisticsOverview from "../LeagueStatisticsOverview/LeagueStatisticsOverview";
import { toast } from "react-toastify";
import { LeagueUpdate } from "../../Models/League";
import LeagueEdit from "../LeagueEdit/LeagueEdit";

type Props = {
    leagueInfo: LeagueProfileDetails;
    leagueId: string;
    getLeagueInfo: () => void;
    isLoggedIn: boolean;
    isUserJoined: boolean;
};

const LeagueSideMenu = ({ isUserJoined, isLoggedIn, leagueInfo, leagueId, getLeagueInfo }: Props) => {
    const [isNewGameOpen, setIsNewGameOpen] = useState<boolean>(false);
    const [isPhotoEditOpen, setIsPhotoEditOpen] = useState<boolean>(false);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [leagueEdit, setLeagueEdit] = useState<LeagueUpdate>({
        name: leagueInfo.name,
        description: leagueInfo.description,
        maxPlayers: leagueInfo.maxPlayers,
        public: leagueInfo.public,
        image: null,
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setLeagueEdit((prevLeagueEdit) => ({
                ...prevLeagueEdit,
                image: event.target.files![0],
            }));
        }
    };

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

    const handlePhotoEditOpen = () => {
        setIsPhotoEditOpen(true);
    };

    const handlePhotoEditClose = () => {
        setIsPhotoEditOpen(false);
    };

    return (
        <>
            <div className="bg-white">
                <div className="flex items-center">
                    <img
                        className="h-32 w-32 rounded-full"
                        src={
                            leagueInfo.photo
                                ? `data:image/png;base64,${leagueInfo.photo} `
                                : "https://foundations.projectpythia.org/_images/GitHub-logo.png"
                        }
                        alt="league image"
                        onClick={handlePhotoEditOpen}
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
                <h1 className="text-2xl px-2">
                    Total games played: {leagueInfo.games.filter((g) => g.status == "Finished").length}
                </h1>
                <h1 className="text-2xl px-2">
                    Upcomming games: {leagueInfo.games.filter((g) => g.status == "Unfinished").length}
                </h1>
                <h1 className="text-2xl px-2">
                    Live games: {leagueInfo.games.filter((g) => g.status == "Started").length}
                </h1>

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
            <Modal isOpen={isPhotoEditOpen} title="Edit photo" onClose={handlePhotoEditClose} hasCloseBtn={true}>
                <LeagueEdit leagueId={leagueId} leagueInfo={leagueInfo}/>
            </Modal>
        </>
    );
};

export default LeagueSideMenu;
