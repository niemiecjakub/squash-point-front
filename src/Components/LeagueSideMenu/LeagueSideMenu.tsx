import React, { useState } from "react";
import { LeagueProfileDetails } from "../../squashpoint";
import NewGameForm from "../NewGameForm/NewGameForm";
import LeagueMembershipOptions from "../LeagueMembershipOptions/LeagueMembershipOptions";
import { leagueJoinApi, leagueLeaveApi, leagueUpdateApi } from "../../Services/LeagueService";
import Modal from "../Modal/Modal";
import LeagueStatisticsOverview from "../LeagueStatisticsOverview/LeagueStatisticsOverview";
import { toast } from "react-toastify";
import { LeagueUpdate } from "../../Models/League";

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
    });

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
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

    const handlePhotoUpload = async () => {
        await leagueUpdateApi(leagueId, imageFile, leagueEdit)
            .then(() => toast.success("Photo uploaded"))
            .catch((e) => toast.error(e));
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
                <div className="w-1/2">
                    <label htmlFor="leagueName">League name</label>
                    <input placeholder={`${leagueEdit.name}`} defaultValue={leagueEdit.name} />
                    <br />

                    <label htmlFor="leagueDescription">League description</label>
                    <input placeholder={`${leagueEdit.description}`} defaultValue={leagueEdit.description} />
                    <br />

                    <label htmlFor="leagueMaxPlayers">League max players</label>
                    <input
                        type="number"
                        placeholder={`${leagueEdit.maxPlayers}`}
                        defaultValue={leagueEdit.maxPlayers}
                    />
                    <br />

                    <label htmlFor="leaguePublic">League public status</label>
                    <input placeholder={`${leagueEdit.public}`} />
                    <br />

                    <label htmlFor="leaguePublic">League image</label>
                    <input type="file" onChange={handleFileChange} />
                    <br />
                    <button className="px-4 py-2 bg-green-400" onClick={handlePhotoUpload}>
                        Submit
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default LeagueSideMenu;
