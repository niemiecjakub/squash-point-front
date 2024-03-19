import { useEffect, useState } from "react";
import { playerGamesOverviewGetByIdApi } from "../../Services/PlayerService";
import { StatisticsOverview } from "../../squashpoint";
import PlayerStatisticsOverview from "../PlayerStatisticsOverview/PlayerStatisticsOverview";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const getOverviewData = (data: StatisticsOverview) => {
  return [
    { name: "won", value: data.won },
    { name: "lost", value: data.played },
  ];
};

type Props = {
  playerId: string;
};

const PlayerStatisticsOverviewList = ({ playerId }: Props) => {
  const [playerGamesOverview, setPlayerGamesOverview] =
    useState<StatisticsOverview[]>();
  const [playerGamesOverviewLoadig, setPlayerGamesOverviewLoading] =
    useState<boolean>(true);

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
    <div className="flex h-80 w-full">
      {playerGamesOverviewLoadig ? (
        <LoadingSpinner />
      ) : (
        <>
          {playerGamesOverview &&
            playerGamesOverview.map((stats) => (
              <PlayerStatisticsOverview
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
