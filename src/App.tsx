import { Outlet } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToasify.css";
import { UserProvider } from "./Context/useAuth";

function App() {
  return (
    <UserProvider>
      <div className="bg-slate-400 min-h-screen">
        <div className="w-screen bg-red-400">
          <div className="w-5/6 m-auto">
            <Navbar />
          </div>
        </div>
        <div className="w-5/6 mx-auto mt-5 h-full">
          <Outlet />
        </div>
        <ToastContainer />
      </div>
    </UserProvider>
  );
}

export default App;
