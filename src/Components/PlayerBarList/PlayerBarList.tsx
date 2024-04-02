import { useEffect, useState } from "react";
import PlayerBar from "../PlayerBar/PlayerBar";
import { UserProfile } from "../../Models/User";
import { Player } from "../../Models/Player";

interface Props {
    isOpen?: boolean;
    getPlayers?: () => any;
    data?: UserProfile[];
    className?: string;
}

const PlayerBarList: React.FC<Props> = ({ isOpen = true, getPlayers, data, className }: Props) => {
    const [players, setPlayers] = useState<Player[] | UserProfile[]>([]);
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
            setLoading(false);
        } else {
            if (isOpen) {
                setLoading(true);
                fetchData();
                setLoading(false);
            }
        }
    }, [isOpen, data]);
    return (
        <>
            {players.map((player) => (
                <PlayerBar className={className} key={player.id} player={player} />
            ))}
        </>
    );
};

export default PlayerBarList;
