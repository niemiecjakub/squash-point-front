import React, { useEffect, useState } from "react";
import { getLeagues } from "../../api";
import { LeagueProfile } from "../../squashpoint";
import League from "../League/League";

interface Props {}

const LeagueList: React.FC<Props> = (props: Props): JSX.Element => {
  const [leagues, setLeagues] = useState<LeagueProfile[]>([]);

  useEffect(() => {
    const getLeagueList = async () => {
      try {
        const data = await getLeagues();
        if (data && Array.isArray(data)) {
          setLeagues(data);
        } else {
          console.error("Invalid data received:", data);
        }
      } catch (error) {
        console.error("Error fetching leagues:", error);
      }
    };

    getLeagueList();
  }, []);


  return (
    <div>
      {leagues.length > 0 ? (
        leagues.map((result) => {
          return <League LeagueProfile={result} key={result.id}/>;
        })
      ) : (
        <p className="mb-3 mt-3 text-xl font-semibold text-center md:text-xl">
          No results!
        </p>
      )}
    </div>
  );
};

export default LeagueList;
