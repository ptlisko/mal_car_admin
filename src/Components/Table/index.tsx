import * as React from 'react';
import { get, map } from 'lodash-es';
import { useTable } from 'react-table';
import {
    CTable,
    CTableBody,
    CTableDataCell,
    CTableHead,
    CTableHeaderCell,
    CTableRow,
} from '@coreui/react';

import Preloader from '../Preloader';

import { ITableProps } from './interfaces';

import './styles.css';

/**
 * @category Component Table
 */
const Table: React.FC<ITableProps> = (
    props: ITableProps
): JSX.Element => {
    const { getTableProps, headerGroups, rows, prepareRow } = useTable({
        // @ts-ignore
        columns: get(props, 'columns', []),
        data: get(props, 'data', []),
    });
    const handleOnRowClick = React.useCallback(
        (entity: Record<any, any>) => (event: React.MouseEvent) => {
            if (event) {
                event.preventDefault();
                event.stopPropagation();
            }
            const onRowClick = get(props, 'onRowClick', null);
            if (onRowClick) {
                onRowClick(entity);
            }
        },
        [props]
    );

    return (
        <CTable
            striped
            bordered
            responsive
            hover
            {...getTableProps()}
            style={{
                minHeight: '160px',
            }}
        >
            <CTableHead>
                <CTableRow>
                    {map(headerGroups, (hg, headerGroupKey) => {
                        return map(hg.headers, (header, headerKey) => {
                            return (
                                <CTableHeaderCell
                                    scope="col"
                                    key={`admin-table-header-item-${headerGroupKey}-${headerKey}`}
                                >
                                    {`${get(header, 'Header', '')}`}
                                </CTableHeaderCell>
                            );
                        });
                    })}
                </CTableRow>
            </CTableHead>
            <CTableBody
                style={{
                    position: 'relative',
                }}
            >
                {get(props, 'loading', false) && (
                    <div className="table-loading-overlay">
                        <Preloader />
                    </div>
                )}
                {map(rows, (singleRow, singleRowKey) => {
                    prepareRow(singleRow);

                    return (
                        <CTableRow
                            {...singleRow.getRowProps()}
                            onClick={handleOnRowClick(
                                get(singleRow, 'original', {})
                            )}
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            {map(
                                get(singleRow, 'cells', []),
                                (singleCell, singleCellKey) => {
                                    return (
                                        <CTableDataCell
                                            {...singleCell.getCellProps()}
                                            key={`admin-table-row-item-${singleRowKey}-${singleCellKey}`}
                                        >
                                            {singleCell.render('Cell')}
                                        </CTableDataCell>
                                    );
                                }
                            )}
                        </CTableRow>
                    );
                })}
            </CTableBody>
        </CTable>
    );
};

export default Table;
