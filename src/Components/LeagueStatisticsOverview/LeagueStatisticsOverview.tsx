import { LeagueProfileDetails } from "../../squashpoint";

interface Props {
    data: LeagueProfileDetails;
}

const LeagueStatisticsOverview = ({ data }: Props) => {
    console.log(data)
    return (
        <div className="flex-col">
            <p>CHARTS...</p>
        </div>
    );
};

export default LeagueStatisticsOverview;
