import React, { useEffect, useState } from "react";
import { LeagueProfile } from "../../squashpoint";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router";

interface LeagueListProps {
  className?: string;
  title?: string;
}

interface DataRow {
  name: string;
  id: number;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Name",
    selector: (row) => row.name,
    sortable: true,
  },
];

const LeagueList: React.FC<LeagueListProps> = ({ className, title }) => {
  const navigate = useNavigate();
  const [leagues, setLeagues] = useState<LeagueProfile[]>([]);
  const [data, error, loading, fetchData] = useAxiosFetch({
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

  const handleRowClick = (row: LeagueProfile) => {
    console.log("Clicked row:", row);
    navigate(`/league/${row.id}`);
  };

  return (
    <div className={`${className}`}>
      {leagues && (
        <DataTable
          title={title}
          columns={columns}
          data={leagues}
          progressPending={loading}
          progressComponent={<p>loading:P</p>}
          onRowClicked={handleRowClick}
        />
      )}
    </div>
  );
};

export default LeagueList;
