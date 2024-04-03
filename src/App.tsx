import { Outlet } from "react-router";
import Navbar from "./Components/Navbar/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect } from "react";
import { useUserStore } from "./Context/userStore";
import axios from "axios";

const queryClient = new QueryClient();

function App() {
    const { setUser } = useUserStore();
    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            setUser(JSON.parse(user), true);
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
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
        </QueryClientProvider>
    );
}

export default App;
