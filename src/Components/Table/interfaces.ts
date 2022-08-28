export interface ITableProps {
    columns: Record<any, any>[];
    data: Record<any, any>[];
    loading?: boolean;
    onRowClick?: (entity: Record<any, any>) => void;
}
