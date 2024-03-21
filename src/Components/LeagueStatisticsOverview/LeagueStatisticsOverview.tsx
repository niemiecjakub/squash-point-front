import { LeagueProfileDetails } from "../../squashpoint";

interface Props {
    data: LeagueProfileDetails;
}

const LeagueStatisticsOverview = ({ data: { games, players } }: Props) => {
    return (
        <div className="flex-col">
            <p>players: {players.length}</p>
            <p>games: {games.length}</p>

            <p>CHARTS...</p>
        </div>
    );
};

export default LeagueStatisticsOverview;
