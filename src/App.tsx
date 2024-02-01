import { Outlet } from "react-router";
import LeagueList from "./Components/LeagueList/LeagueList";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;
