import { useQuery } from "react-query";
import { PlayerGameStatistics } from "../../Models/Player";
import PlayerStatistics from "../PlayerStatistics/PlayerStatistics";
import { useEffect } from "react";
import { playerGamesOverviewGetByIdApi } from "../../Services/PlayerService";
import { usePlayerStore } from "../../Context/playerStore";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const COLORS = ["#394dcd", "#e35f5f", "#FFBB28"];

const getOverviewData = (data: PlayerGameStatistics) => {
    return [
        { name: "win", value: data.won },
        { name: "lose", value: data.played },
    ];
};

type Props = { leagueId: string };

const PlayerStatisticsList = ({ leagueId }: Props) => {
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
                <PlayerStatistics key={stats.name} name={stats.name} data={getOverviewData(stats)} colors={COLORS} />
            ))}
        </div>
    );
};

export default PlayerStatisticsList;
