import * as React from 'react';
import { get } from 'lodash-es';

import { DeviceServiceContext } from '../../Services/DeviceService';

import SideBar from '../SideBar';

import { IContentProps } from './interfaces';

import './styles.css';

const Content: React.FC<IContentProps> = (props: IContentProps): JSX.Element => {
    const deviceServiceContext = React.useContext(DeviceServiceContext);
    return (
        <div
            className='mal-car-content'
            style={{
                height: `${deviceServiceContext.layoutHeiht - 100}px`,
            }}
        >
            <SideBar />
            {get(props, 'children', '')}
        </div>
    );
};

export default Content;
