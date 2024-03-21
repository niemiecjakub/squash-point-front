import { useEffect, useRef, useState } from "react";
import Modal from "../Modal/Modal";
import { PlayerProfile } from "../../squashpoint";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PlayerBar from "../PlayerBar/PlayerBar";
import { useNavigate } from "react-router-dom";

interface Props {
    title: string;
    isOpen: boolean;
    onClose: () => void;
    getPlayers: () => any;
}

const SocialModal: React.FC<Props> = ({ title, isOpen, onClose, getPlayers }: Props) => {
    const navigate = useNavigate();
    const [players, setPlayers] = useState<PlayerProfile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const fetchData = async () => {
            const data = await getPlayers();
            console.log(data);
            setPlayers(data.data);
            return data;
        };

        if (isOpen) {
            setLoading(true);
            fetchData();
            setLoading(false);
        }
    }, [isOpen]);

    return (
        <Modal hasCloseBtn={true} isOpen={isOpen} onClose={onClose} title={title}>
            {loading ? (
                <LoadingSpinner />
            ) : (
                <>
                    {players.map((player) => (
                        <PlayerBar player={player} />
                    ))}
                </>
            )}
        </Modal>
    );
};

export default SocialModal;
