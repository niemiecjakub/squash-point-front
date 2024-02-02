import React, { useEffect, useState } from "react";
import { LeagueProfile } from "../../squashpoint";
import League from "../League/League";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";

const LeagueList: React.FC = () => {
  const [leagues, setLeagues] = useState<LeagueProfile[]>([]);
  const [ data, error, loading, fetchData ] = useAxiosFetch({
    method: "GET",
    url: "/League/league-list",
  });
  
  useEffect(() => {
    if (data) {
      setLeagues(data);
      console.log(data);
    } else {
      setLeagues([]);
    }
  }, [data]);

  useEffect(() => {
    if (error) {
      console.log(error);
    }
  }, [error]);

  useEffect(() => {
    if (loading) {
      console.log("retrieving leagues...");
    }
  }, [loading]);


  return (
    <div>
      <div>
        <h4>Leagues List</h4>
        {loading && <p>loading...</p>}
        <ul>
          {leagues &&
            leagues.map((league, index) => (
              <li key={index} >
                <League LeagueProfile={league} />
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default LeagueList;
