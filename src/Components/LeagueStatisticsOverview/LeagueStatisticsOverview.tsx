import { LeagueProfileDetails } from "../../squashpoint";

interface Props {
    data: LeagueProfileDetails;
}

const LeagueStatisticsOverview = ({ data }: Props) => {
    return (
        <div className="flex-col">
            <p>CHARTS...</p>
        </div>
    );
};

export default LeagueStatisticsOverview;
