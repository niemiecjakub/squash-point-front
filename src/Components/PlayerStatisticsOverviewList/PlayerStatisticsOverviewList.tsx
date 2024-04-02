import { useQuery } from "react-query";
import { PlayerStatistics } from "../../Models/Player";
import PlayerStatisticsOverview from "../PlayerStatisticsOverview/PlayerStatisticsOverview";
import { useEffect } from "react";
import { playerGamesOverviewGetByIdApi } from "../../Services/PlayerService";
import { usePlayerStore } from "../../Context/playerStore";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const COLORS = ["#394dcd", "#e35f5f", "#FFBB28"];

const getOverviewData = (data: PlayerStatistics) => {
    return [
        { name: "win", value: data.won },
        { name: "lose", value: data.played },
    ];
};

type Props = { leagueId: string };

const PlayerStatisticsOverviewList = ({ leagueId }: Props) => {
    const { playerStatisctics, setPlayerStatisctics } = usePlayerStore((state) => state);

    const {
        data: statistics,
        isLoading: isStatisticsLoading,
        refetch: refetchStatistics,
    } = useQuery({
        queryFn: () => playerGamesOverviewGetByIdApi(leagueId!),
        queryKey: ["statistics"],
    });

    useEffect(() => {
        if (statistics?.data) {
            setPlayerStatisctics(statistics.data);
        }
    }, [statistics, setPlayerStatisctics, refetchStatistics]);

    return isStatisticsLoading ? (
        <LoadingSpinner />
    ) : (
        <div className="flex w-full">
            {playerStatisctics.map((stats) => (
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
