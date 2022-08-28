import * as React from 'react';
import { get, toNumber } from 'lodash-es';
import Card from 'react-bootstrap/Card';
import { useSearchParams, useParams } from 'react-router-dom';

import { DeviceServiceContext } from '../../Services/DeviceService';
import { ProxyServiceContext } from '../../Services/ProxyService/context';
import { AuthenticationServiceContext } from '../../Services/AuthenticationService';
import { NotificationServiceContext } from '../../Services/NotificationService';
import { LocalizationContext } from '../../Services/LocalizationService';
import { ModalContext } from '../../Components/Modal/context';

import usePrevious from '../../Hooks/usePrevious';

import WithAuth from '../../Services/AuthenticationService/Components/WithAuth';

const UserDetailPage: React.FC = (): JSX.Element => {
    const [currentPage, setCurrentPage] = React.useState(1);
    const [searchParams] = useSearchParams();
    const [userListState, setUserListState] = React.useState<Record<any, any>>({
        loading: false,
        loaded: false,
        limit: toNumber(searchParams.get('limit') || 16),
        offset: toNumber(searchParams.get('offset')|| 0),
        count: 0,
        userList: [] as Record<any, any>[],
    });
    const params = useParams();
    console.log('DETAIL PARAMS => ', params);
    const previousOffest = usePrevious(userListState.offset);
    const notificationServiceContext = React.useContext(NotificationServiceContext);
    const localizationContext = React.useContext(LocalizationContext);
    const deviceServiceContext = React.useContext(DeviceServiceContext);
    const proxyServiceContext = React.useContext(ProxyServiceContext);
    const t = localizationContext.useFormatMessage();
    const modalContext = React.useContext(ModalContext);
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);


    return (
        <div
            className='page'
        >
            <Card
                style={{
                    width: '100%',
                    height: '100%',
                }}
            >
                USER DETAIL
            </Card>
        </div>
    );
};

const WithAuthPage: React.FC = (): JSX.Element => {
    return (
        <WithAuth
            allowAuthenticated={true}
            allowHost={false}
        >
            <UserDetailPage />
        </WithAuth>
    )
};

export default WithAuthPage;
