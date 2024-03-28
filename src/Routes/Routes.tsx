import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LeaguePage from "../Pages/LeaguePage/LeaguePage";
import PlayerPage from "../Pages/PlayerPage/PlayerPage";
import GamePage from "../Pages/GamePage/GamePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import ProtectedRoute from "./ProtectedRoute";
import AccountPage from "../Pages/AccountPage/AccountPage";
import PlayerSearchPage from "../Pages/PlayerSearchPage/PlayerSearchPage";
import LeagueSearchPage from "../Pages/LeagueSearchPage/LeagueSearchPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "", element: <HomePage /> },
            { path: "login", element: <LoginPage /> },
            { path: "register", element: <RegisterPage /> },
            { path: "leagues", element: <LeagueSearchPage /> },
            { path: "league/:id", element: <LeaguePage /> },
            { path: "players", element: <PlayerSearchPage /> },
            { path: "player/:id", element: <PlayerPage /> },
            { path: "game/:id", element: <GamePage /> },
            {
                path: "account",
                element: (
                    <ProtectedRoute>
                        <AccountPage />
                    </ProtectedRoute>
                ),
            },
        ],
    },
]);
