import * as React from 'react';
import { get } from 'lodash-es';

import { IContentProps } from './interfaces';

import './styles.css';

const Content: React.FC<IContentProps> = (props: IContentProps): JSX.Element => {
    return (
        <div className='mal-car-content'>
            {get(props, 'children', '')}
        </div>
    );
};

export default Content;
