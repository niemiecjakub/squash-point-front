import { useEffect, useState } from "react";
import Modal from "../../Components/Modal/Modal";
import NewLeagueForm from "../../Components/NewLeagueForm/NewLeagueForm";
import PlayerEdit from "../../Components/PlayerEdit/PlayerEdit";
import PlayerBarList from "../../Components/PlayerBarList/PlayerBarList";
import { getUserSocialDataApi } from "../../Services/PlayerService";
import { useQuery } from "react-query";
import { useUserStore } from "../../Context/userStore";
import LoadingSpinner from "../../Components/LoadingSpinner/LoadingSpinner";

type Props = {};

const AccountPage = (props: Props) => {
    const { user } = useUserStore();
    const [isNewLeagueFormOpen, setIsNewLeagueFormOpen] = useState<boolean>(false);
    const [isPlayerEditOpen, setIsPlayerEditOpen] = useState<boolean>(false);

    const { socialData, setSocialData } = useUserStore((state) => state);
    const { data, isLoading } = useQuery({
        queryFn: () => getUserSocialDataApi(user?.id!),
        queryKey: ["social"],
    });

    useEffect(() => {
        if (data?.data) {
            setSocialData(data.data);
        }
    }, [data, setSocialData]);

    useEffect(() => {});
    const handleOpenNewLeagueForm = () => {
        setIsNewLeagueFormOpen(true);
    };

    const handleCloseNewLeagueForm = () => {
        setIsNewLeagueFormOpen(false);
    };

    const handlePlayerEditOpen = () => {
        setIsPlayerEditOpen(true);
    };

    const handlePlayerEditClose = () => {
        setIsPlayerEditOpen(false);
    };

    return (
        <>
            <div>
                <h1>Welcome, {user?.fullName}</h1>
                <button className="bg-green-300 px-4 py-2" onClick={handleOpenNewLeagueForm}>
                    Create new league
                </button>
                <button className="bg-blue-300 px-4 py-2" onClick={handlePlayerEditOpen}>
                    Edit info
                </button>
                {isLoading ? (
                    <LoadingSpinner />
                ) : (
                    <div className="flex w-full">
                        <div className="w-full">
                            <h1>Followers</h1>
                            <PlayerBarList data={socialData.followers!} />
                        </div>

                        <div className="w-full">
                            <h1>Following:</h1>
                            <PlayerBarList data={socialData.following!} />
                        </div>
                        <div className="w-full">
                            <h1>Friends:</h1>
                            <PlayerBarList data={socialData.friends!} />
                        </div>
                        <div className="w-full">
                            <h1>Sent Friend Requests:</h1>
                            <PlayerBarList data={socialData.sentFriendRequests!} />
                        </div>

                        <div className="w-full">
                            <h1>Received Friend Requests:</h1>
                            <PlayerBarList data={socialData.receivedFriendRequests} />
                        </div>
                    </div>
                )}
            </div>
            <Modal isOpen={isNewLeagueFormOpen} hasCloseBtn={true} onClose={handleCloseNewLeagueForm}>
                <NewLeagueForm close={handleCloseNewLeagueForm} />
            </Modal>

            <Modal
                title="Edit profile"
                isOpen={isPlayerEditOpen}
                onClose={handlePlayerEditClose}
                className="w-1/4 max-h-1/3"
                hasCloseBtn={true}
            >
                <PlayerEdit playeInfo={user!} />
            </Modal>
        </>
    );
};

export default AccountPage;
