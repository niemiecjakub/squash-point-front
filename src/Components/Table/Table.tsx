import React from "react";
import DataTable, { TableColumn } from "react-data-table-component";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";

export interface TableProps<T> {
    loading: boolean;
    data: T[] | null;
    columns: TableColumn<T>[];
    className?: string;
    title?: string;
    onRowClicked?: (row: any, e: React.MouseEvent<Element, MouseEvent>) => void;
    pagination?: boolean;
}

const Table: React.FC<TableProps<any>> = ({ loading, className, title, data, onRowClicked, pagination, columns }) => {
    return (
        <div className={`${className}`}>
            {data && (
                <DataTable
                    title={title}
                    columns={columns}
                    data={data}
                    progressPending={loading}
                    progressComponent={<LoadingSpinner />}
                    onRowClicked={onRowClicked}
                    pagination={pagination ? true : false}
                    striped
                    highlightOnHover
                    pointerOnHover
                />
            )}
        </div>
    );
};

export default Table;
