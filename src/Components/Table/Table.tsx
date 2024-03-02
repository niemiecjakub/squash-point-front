import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";

export interface TableProps<T> {
  loading: boolean;
  data: T[] | null;
  columns: TableColumn<T>[];
  className?: string;
  title?: string;
  onRowClicked?: any;
}

const Table: React.FC<TableProps<any>> = ({
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

export default Table;
