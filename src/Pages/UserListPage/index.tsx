import * as React from 'react';
import { get } from 'lodash-es';

import { DeviceServiceContext } from '../../Services/DeviceService';
import { ProxyServiceContext } from '../../Services/ProxyService/context';
import { AuthenticationServiceContext } from '../../Services/AuthenticationService';

import WithAuth from '../../Services/AuthenticationService/Components/WithAuth';

import './styles.css';

const UserListPage: React.FC = (): JSX.Element => {
    const deviceServiceContext = React.useContext(DeviceServiceContext);
    const proxyServiceContext = React.useContext(ProxyServiceContext);
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);
    console.log('RENDER DASH BOARD PAGE => ', authenticationServiceContext.authUser);
    return (
        <div
            className='page'
        >
            USER LIST PAGE
        </div>
    );
};

const WithAuthPage: React.FC = (): JSX.Element => {
    return (
        <WithAuth
            allowAuthenticated={true}
            allowHost={false}
        >
            <UserListPage />
        </WithAuth>
    )
};

export default WithAuthPage;
