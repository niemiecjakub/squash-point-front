import { Link } from "react-router-dom";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <Link to="/">
      <div className="bg-red-400 py-5 flex justify-between items-center px-56">
        <h1 className="text-lg font-bold">SQUASH POINT</h1>
        <div className="flex justify-end items-center w-1/5">
          <button className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">LEAGUES</button>
          <button className="font-bold bg-slate-50 mx-2 px-4 py-2 rounded-xl">ACCOUNT</button>
        </div>
      </div>
    </Link>
  );
};

export default Navbar;
