import { useState, useEffect } from "react";
import { useParams } from "react-router";
import LeagueDashboard from "../../Components/LeagueDashboard/LeagueDashboard";
import LeagueTable from "../../Components/LeagueTable/LeagueTable";
import { LeagueProfileDetails } from "../../squashpoint";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";

type Props = {};

const LeaguePage = (props: Props) => {
  const { id } = useParams();
  const [leagueData, setLeagueData] = useState<LeagueProfileDetails>();
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "GET",
    url: `/League/${id}`,
  });

  useEffect(() => {
    if (data) {
      setLeagueData(data);
    }
  }, [data]);

  return (
    <>
      <LeagueDashboard />
      <LeagueTable loading={loading} playerData={leagueData?.players}/>
    </>
  );
};

export default LeaguePage;
