import { useEffect, useRef, useState } from "react";
import { PlayerProfile } from "../../squashpoint";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PlayerBar from "../PlayerBar/PlayerBar";
import { UserProfile } from "../../Models/User";

interface Props {
    isOpen: boolean;
    getPlayers?: () => any;
    data?: UserProfile[];
    className?: string;
}

const PlayerBarList: React.FC<Props> = ({ isOpen, getPlayers, data, className }: Props) => {
    const [players, setPlayers] = useState<PlayerProfile[] | UserProfile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            if (getPlayers) {
                const data = await getPlayers();
                setPlayers(data.data);
                return data;
            }
        };

        if (data) {
            setPlayers(data);
            setLoading(false)
        } else {
            if (isOpen) {
                setLoading(true);
                fetchData();
                setLoading(false);
            }
        }
    }, [isOpen]);
    return loading ? (
        <div className="flex items-center justify-center ">
            <LoadingSpinner />
        </div>
    ) : (
        <>
            {players.map((player) => (
                <PlayerBar className={className} key={player.id} player={player} />
            ))}
        </>
    );
};

export default PlayerBarList;
