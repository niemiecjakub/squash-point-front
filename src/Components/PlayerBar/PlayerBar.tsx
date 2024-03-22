import { useNavigate } from "react-router-dom";
import { PlayerProfile } from "../../squashpoint";
import { UserProfile } from "../../Models/User";

interface Props {
    player: PlayerProfile | UserProfile;
    className?: string;
}

const PlayerBar = ({ player: { fullName, id }, className }: Props) => {
    const navigate = useNavigate();
    const handleProfileNavigate = () => {
        navigate(`/Player/${id}`);
        navigate(0);
    };
    return (
        <div className={`flex justify-between items-center my-5 mx-2 rounded-r-full hover:bg-slate-200 ${className}`}>
            <h1 className="text-lg px-2">{fullName}</h1>
            <button className="bg-yellow-200 rounded-xl px-3 py-2" onClick={handleProfileNavigate}>
                view profile
            </button>
        </div>
    );
};

export default PlayerBar;
