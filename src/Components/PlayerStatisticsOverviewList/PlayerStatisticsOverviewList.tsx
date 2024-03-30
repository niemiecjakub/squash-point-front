
import { PlayerStatistics } from "../../Models/Player";
import PlayerStatisticsOverview from "../PlayerStatisticsOverview/PlayerStatisticsOverview";

const COLORS = ["#394dcd", "#e35f5f", "#FFBB28"];

const getOverviewData = (data: PlayerStatistics) => {
    return [
        { name: "win", value: data.won },
        { name: "lose", value: data.played },
    ];
};

type Props = {
    statistics: PlayerStatistics[];
};

const PlayerStatisticsOverviewList = ({ statistics }: Props) => {
    return (
        <div className="flex w-full">
            {statistics.map((stats) => (
                <PlayerStatisticsOverview
                    key={stats.name}
                    name={stats.name}
                    data={getOverviewData(stats)}
                    colors={COLORS}
                />
            ))}
        </div>
    );
};

export default PlayerStatisticsOverviewList;
