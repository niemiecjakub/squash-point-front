import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <div className="py-5 flex justify-between items-center">
      <Link to="/">
        <h1 className="text-lg font-bold">SQUASH POINT</h1>
      </Link>
      <div className="flex justify-end items-center w-1/5">
        <button className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">
          PLAYERS
        </button>
        <button className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">
          LEAGUES
        </button>
        <Link to="register">
          <button className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">
            REGISTER
          </button>
        </Link>
        <Link to="login">
        <button className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">
          LOGIN
        </button>
        </Link>
        <button className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">
          ACCOUNT
        </button>
      </div>
    </div>
  );
};

export default Navbar;
