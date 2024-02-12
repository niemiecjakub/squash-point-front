import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

interface LeagueScoreboardProps<T> {
  loading: boolean;
  data: T[] | undefined;
  columns: TableColumn<T>[];
  className?: string;
  title?: string;
  onRowClicked?: any;
}

const LeagueScoreboard: React.FC<LeagueScoreboardProps<any>> = ({
  loading,
  className,
  title,
  data,
  onRowClicked,
  columns,
}) => {
  return (
    <div className={`${className}`}>
      {data && (
        <DataTable
          title={title}
          columns={columns}
          data={data}
          progressPending={loading}
          progressComponent={<p>loading:P</p>}
          onRowClicked={onRowClicked}
        />
      )}
    </div>
  );
};

export default LeagueScoreboard;
