import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router";
import { PlayerProfile } from "../../squashpoint";

interface LeagueTableProps {
  className?: string;
  title?: string;
  loading: boolean;
  playerData: PlayerProfile[] | undefined;
}

const columns: TableColumn<PlayerProfile>[] = [
  {
    name: "Name",
    selector: (row) => row.fullName,
    sortable: true,
  },
];

const LeagueTable: React.FC<LeagueTableProps> = ({
  loading,
  className,
  title,
  playerData,
}) => {
  const navigate = useNavigate();

  const handleRowClick = (row: any) => {
    console.log("Clicked row:", row);
    navigate(`/league/${row.id}`);
  };

  return (
    <div className={`${className}`}>
      {playerData && (
        <DataTable
          title={title}
          columns={columns}
          data={playerData}
          progressPending={loading}
          progressComponent={<p>loading:P</p>}
          onRowClicked={handleRowClick}
        />
      )}
    </div>
  );
};

export default LeagueTable;
