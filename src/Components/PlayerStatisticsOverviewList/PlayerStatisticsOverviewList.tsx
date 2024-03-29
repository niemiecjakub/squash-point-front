import { useEffect, useState } from "react";
import { playerGamesOverviewGetByIdApi } from "../../Services/PlayerService";
import { StatisticsOverview } from "../../squashpoint";
import PlayerStatisticsOverview from "../PlayerStatisticsOverview/PlayerStatisticsOverview";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const COLORS = ["#394dcd", "#e35f5f", "#FFBB28"];

const getOverviewData = (data: StatisticsOverview) => {
    return [
        { name: "win", value: data.won },
        { name: "lose", value: data.played },
    ];
};

type Props = {
    playerId: string;
};

const PlayerStatisticsOverviewList = ({ playerId }: Props) => {
    const [playerGamesOverview, setPlayerGamesOverview] = useState<StatisticsOverview[]>();
    const [playerGamesOverviewLoadig, setPlayerGamesOverviewLoading] = useState<boolean>(true);

    useEffect(() => {
        getGamesOverview();
    }, []);

    const getGamesOverview = () => {
        setPlayerGamesOverviewLoading(true);
        playerGamesOverviewGetByIdApi(playerId!).then((res) => {
            setPlayerGamesOverview(res?.data!);
        });
        setPlayerGamesOverviewLoading(false);
    };

    return (
        <div className="flex w-full">
            {playerGamesOverviewLoadig ? (
                <LoadingSpinner />
            ) : (
                <>
                    {playerGamesOverview &&
                        playerGamesOverview.map((stats) => (
                            <PlayerStatisticsOverview
                                key={stats.name}
                                name={stats.name}
                                data={getOverviewData(stats)}
                                colors={COLORS}
                            />
                        ))}
                </>
            )}
        </div>
    );
};

export default PlayerStatisticsOverviewList;
