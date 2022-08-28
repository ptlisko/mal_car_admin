import * as React from 'react';
import { get } from 'lodash-es';

import ResponsivePagination from 'react-responsive-pagination';

import './styles.css';

const getTotal = (total: number, limit: number): number => {
    return Math.ceil(total / limit);
};

/**
 * @category Component Pagination
 */
const Pagination: React.FC<Record<any, any>> = (props): JSX.Element => {
    const [total] = React.useState(
        getTotal(get(props, 'total', 0), get(props, 'limit', 0))
    );

    const handleOnPageChange = (nextPage: number) => {
        const onPageChange = get(props, 'onPageChange', null);

        if (onPageChange) {
            onPageChange(nextPage);
        }
    };

    return (
        <div className="admin-pagination">
            <ResponsivePagination
                previousLabel="<"
                nextLabel=">"
                current={get(props, 'currentPage', 1)}
                total={total}
                onPageChange={handleOnPageChange}
            />
        </div>
    );
};

export default Pagination;
