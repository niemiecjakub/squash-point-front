import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LeaguePage from "../Pages/LeaguePage/LeaguePage";
import PlayerPage from "../Pages/PlayerPage/PlayerPage";

export const router = createBrowserRouter([
  {
    path:"/",
    element: <App />,
    children:[
      {path: "", element: <HomePage />},
      {path: "league/:id", element: <LeaguePage />},
      {path: "player/:id", element: <PlayerPage />},
    ]
  }
])