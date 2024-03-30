import { useNavigate } from "react-router-dom";
import { UserProfile } from "../../Models/User";
import { Player } from "../../Models/Player";

interface Props {
    player: Player | UserProfile;
    className?: string;
}

const PlayerBar = ({ player: { fullName, id, photo }, className }: Props) => {
    const navigate = useNavigate();
    const handleProfileNavigate = () => {
        navigate(`/Player/${id}`);
        navigate(0);
    };
    return (
        <div className={`flex justify-between items-center my-5 mx-2 rounded-r-full hover:bg-slate-200 ${className}`}>
            <div className="flex items-center">
                <img
                    className="h-12 rounded-full"
                    src={photo ? `data:image/png;base64,${photo} ` : `${process.env.PUBLIC_URL}` + "/player.png"}
                    alt="player photo"
                />
                <h1 className="text-lg px-2">{fullName}</h1>
            </div>
            <button className="bg-yellow-200 rounded-xl px-3 py-2" onClick={handleProfileNavigate}>
                view profile
            </button>
        </div>
    );
};

export default PlayerBar;
