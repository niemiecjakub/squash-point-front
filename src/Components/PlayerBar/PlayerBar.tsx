import { useNavigate } from "react-router-dom";
import { PlayerProfile } from "../../squashpoint";

interface Props {
    player: PlayerProfile;
}

const PlayerBar = ({ player: { fullName, sex, id } }: Props) => {
    const navigate = useNavigate();
    const handleProfileNavigate = () => {
        navigate(`/Player/${id}`);
        navigate(0);
    };
    return (
        <div className="flex justify-between items-center my-5 mx-2 rounded-r-full hover:bg-slate-200">
            <h1 className="text-lg px-2">{fullName}</h1>
            <h1>{sex}</h1>
            <button className="bg-yellow-200 rounded-xl px-3 py-2" onClick={handleProfileNavigate}>
                view profile
            </button>
        </div>
    );
};

export default PlayerBar;
