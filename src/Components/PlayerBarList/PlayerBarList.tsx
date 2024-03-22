import { useEffect, useRef, useState } from "react";
import { PlayerProfile } from "../../squashpoint";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import PlayerBar from "../PlayerBar/PlayerBar";

interface Props {
    isOpen: boolean;
    getPlayers: () => any;
}

const PlayerBarList: React.FC<Props> = ({ isOpen, getPlayers }: Props) => {
    const [players, setPlayers] = useState<PlayerProfile[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchData = async () => {
            const data = await getPlayers();
            setPlayers(data.data);
            return data;
        };

        if (isOpen) {
            setLoading(true);
            fetchData();
            setLoading(false);
        }
    }, [isOpen]);

    return loading ? (
        <div className="flex items-center justify-center ">
            <LoadingSpinner />
        </div>
    ) : (
        <>
            {players.map((player) => (
                <PlayerBar key={player.id} player={player} />
            ))}
        </>
    );
};

export default PlayerBarList;
