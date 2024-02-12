import { Outlet } from "react-router";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="bg-slate-400 min-h-screen">
      <div className="w-screen bg-red-400">
        <div className="w-5/6 m-auto">
          <Navbar />
        </div>
      </div>
      <div className="w-5/6 mx-auto mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default App;
