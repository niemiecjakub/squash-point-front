import React, { useState } from "react";
import { useAuth } from "../../Context/useAuth";
import Modal from "../../Components/Modal/Modal";
import NewLeagueForm from "../../Components/NewLeagueForm/NewLeagueForm";

type Props = {};

const AccountPage = (props: Props) => {
    const { user } = useAuth();

    const [isNewLeagueFormOpen, setIsNewLeagueFormOpen] = useState<boolean>(false);

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
            </div>
            <Modal isOpen={isNewLeagueFormOpen} hasCloseBtn={true} onClose={handleCloseNewLeagueForm}>
                <NewLeagueForm close={handleCloseNewLeagueForm}/>
            </Modal>
        </>
    );
};

export default AccountPage;
