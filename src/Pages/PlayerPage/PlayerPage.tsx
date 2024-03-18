import { useParams } from "react-router-dom";
import PlayerInfo from "../../Components/PlayerInfo/PlayerInfo";
import PlayerStatisticsOverviewList from "../../Components/PlayerStatisticsOverviewList/PlayerStatisticsOverviewList";

const PlayerPage = () => {
  const { id } = useParams();

  return (
    <>
      <PlayerInfo playerId={id!} />
      <PlayerStatisticsOverviewList playerId={id!} />
    </>
  );
};

export default PlayerPage;
