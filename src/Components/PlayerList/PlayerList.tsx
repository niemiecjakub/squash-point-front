import React, { useEffect, useState } from "react";
import { PlayerProfile } from "../../squashpoint";
import { useAxiosFetch } from "../../Hooks/useAxiosFetch";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router";

interface PlayerListProps {
  className?: string;
  title?: string;
}

interface DataRow {
  fullName: string;
}

const columns: TableColumn<DataRow>[] = [
  {
    name: "Name",
    selector: (row) => row.fullName,
    sortable: true,
  },
];

const PlayerList: React.FC<PlayerListProps> = ({ className, title }) => {
  const navigate = useNavigate();
  const [players, setPlayers] = useState<PlayerProfile[]>([]);
  const [data, error, loading, fetchData] = useAxiosFetch({
    method: "GET",
    url: "/Player/player-list",
  });

  useEffect(() => {
    if (data) {
      setPlayers(data);
      console.log(data);
    } else {
      setPlayers([]);
    }
  }, [data]);

  const handleRowClick = (row: any) => {
    console.log("Clicked row:", row);
    navigate(`/player/${row.id}`);
  };

  return (
    <div className={`${className}`}>
      {players && (
        <DataTable
          title={title}
          columns={columns}
          data={players}
          progressPending={loading}
          progressComponent={<p>loading:P</p>}
          onRowClicked={handleRowClick}
        />
      )}
    </div>
  );
};

export default PlayerList;
