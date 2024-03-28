import { Link } from "react-router-dom";
import { useAuth } from "../../Context/useAuth";

type Props = {};

const Navbar = (props: Props) => {
    const { isLoggedIn, user, logout } = useAuth();
    return (
        <div className="py-5 flex justify-between items-center">
            <Link to="/">
                <h1 className="text-lg font-bold">SQUASH POINT</h1>
            </Link>
            <div className="flex justify-end items-center w-1/5">
                <Link to="/players" className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">
                    PLAYERS
                </Link>
                <Link to="/leagues" className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">
                    LEAGUES
                </Link>
                {isLoggedIn() ? (
                    <>
                        <Link to="/account" className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">
                            ACCOUNT
                        </Link>
                        <button className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl" onClick={logout}>
                            LOGOUT
                        </button>
                    </>
                ) : (
                    <>
                        <Link to="/register" className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">
                            REGISTER
                        </Link>

                        <Link to="/login" className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">
                            LOGIN
                        </Link>
                    </>
                )}
            </div>
        </div>
    );
};

export default Navbar;
