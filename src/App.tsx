import { Outlet } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import { UserProvider } from "./Context/useAuth";
import "react-toastify/dist/ReactToastify.css";

function App() {
    return (
        <UserProvider>
            <div className="bg-slate-400 min-h-screen">
                <div className="w-screen bg-red-400">
                    <div className="w-4/6 m-auto">
                        <Navbar />
                    </div>
                </div>
                <div className="w-4/6 mx-auto mt-5 h-full">
                    <Outlet />
                </div>
                <ToastContainer />
            </div>
        </UserProvider>
    );
}

export default App;
