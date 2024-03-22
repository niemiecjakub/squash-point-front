import { useEffect, useState } from "react";
import { useAuth } from "../../Context/useAuth";
import Modal from "../../Components/Modal/Modal";
import NewLeagueForm from "../../Components/NewLeagueForm/NewLeagueForm";
import PlayerBar from "../../Components/PlayerBar/PlayerBar";

type Props = {};

const AccountPage = (props: Props) => {
    const { user, getUserSocialData, socialData } = useAuth();

    const [isNewLeagueFormOpen, setIsNewLeagueFormOpen] = useState<boolean>(false);

    useEffect(() => {
        getUserSocialData(user!.id);
    }, []);

    useEffect(() => {});
    const handleOpenNewLeagueForm = () => {
        setIsNewLeagueFormOpen(true);
    };

    const handleCloseNewLeagueForm = () => {
        setIsNewLeagueFormOpen(false);
    };

    return (
        <>
            <div>
                <h1>Welcome, {user?.fullName}</h1>
                <button className="bg-green-300 px-4 py-2" onClick={handleOpenNewLeagueForm}>
                    Create new league
                </button>
                
                <div>
                    <h1>Followers</h1>
                    {socialData?.followers.map((p) => (
                        <PlayerBar player={p} className="w-1/4 bg-blue-100"/>
                    ))}
                </div>

                <div>
                    <h1>Following</h1>
                    {socialData?.following.map((p) => (
                        <PlayerBar player={p} className="w-1/4 bg-red-100"/>
                    ))}
                </div>
                <div>
                    <h1>Friends</h1>
                    {socialData?.friends.map((p) => (
                        <PlayerBar player={p} className="w-1/4 bg-yellow-100"/>
                    ))}
                </div>
                <div>
                    <h1>Friend requests:</h1>
                </div>
            </div>
            <Modal isOpen={isNewLeagueFormOpen} hasCloseBtn={true} onClose={handleCloseNewLeagueForm}>
                <NewLeagueForm close={handleCloseNewLeagueForm} />
            </Modal>
        </>
    );
};

export default AccountPage;
