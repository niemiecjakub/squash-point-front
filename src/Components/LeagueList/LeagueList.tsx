import React, { useEffect, useState } from "react";
import { LeagueProfile } from "../../squashpoint";
import League from "../League/League";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";
import DataTable from "react-data-table-component";

const LeagueList: React.FC = () => {
  const [leagues, setLeagues] = useState<LeagueProfile[]>([]);
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "GET",
    url: "/League/league-list",
  });

  const columns = [
    {
      name: "Name",
      selector: (row: { name: string }) => row.name,
    },
    {
      name: "Year",
      selector: (row: { year: number }) => row.year,
    },
  ];


  const dataTEST = [
    {
      id: 1,
      name: "Beetlejuice",
      year: 1988,
    },
    {
      id: 2,
      name: "Ghostbusters",
      year: 1984,
    },
  ];

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
    <div className="bg-green-300 rounded-xl px-5">
      <h1 className="font-semibold">Leagues</h1>
      {loading && <p>loading...</p>}
      <ul>
        {leagues &&
          leagues.map((league, index) => (
            <li key={index}>
              <League LeagueProfile={league} />
            </li>
          ))}
        <li>
          <League LeagueProfile={{ id: 1, name: "aaaa" }} />
        </li>
        <li>
          <League LeagueProfile={{ id: 1, name: "aaaa" }} />
        </li>
        <li>
          <League LeagueProfile={{ id: 1, name: "aaaa" }} />
        </li>
        <li>
          <League LeagueProfile={{ id: 1, name: "aaaa" }} />
        </li>
        <li>
          <League LeagueProfile={{ id: 1, name: "aaaa" }} />
        </li>
      </ul>

      <DataTable columns={columns} data={dataTEST}/>
    </div>
  );
};

export default LeagueList;
