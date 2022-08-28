import * as React from 'react';
import { get, toNumber } from 'lodash-es';
import Card from 'react-bootstrap/Card';
import { useSearchParams, useNavigate } from 'react-router-dom';

import { DeviceServiceContext } from '../../Services/DeviceService';
import { ProxyServiceContext } from '../../Services/ProxyService/context';
import { AuthenticationServiceContext } from '../../Services/AuthenticationService';
import { NotificationServiceContext } from '../../Services/NotificationService';
import { LocalizationContext } from '../../Services/LocalizationService';
import { ModalContext } from '../../Components/Modal/context';

import Table from '../../Components/Table';
import Pagination from '../../Components/Pagination';

import usePrevious from '../../Hooks/usePrevious';

import WithAuth from '../../Services/AuthenticationService/Components/WithAuth';

import './styles.css';

const UserListPage: React.FC = (): JSX.Element => {
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
    const previousOffest = usePrevious(userListState.offset);
    const navigate = useNavigate();
    const notificationServiceContext = React.useContext(NotificationServiceContext);
    const localizationContext = React.useContext(LocalizationContext);
    const deviceServiceContext = React.useContext(DeviceServiceContext);
    const proxyServiceContext = React.useContext(ProxyServiceContext);
    const t = localizationContext.useFormatMessage();
    const modalContext = React.useContext(ModalContext);
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);

    const onPageChange = React.useCallback((nextPage: number) => {
        setCurrentPage(nextPage);
        setUserListState({
            ...userListState,
            loaded: true,
            offset: (nextPage - 1) * get(userListState, 'limit', 10),
        });
    }, [userListState]);

    React.useEffect(() => {
        if (
            (!userListState.loading && !userListState.loaded) ||
            (previousOffest !== userListState.offset)
        ) {
            setUserListState({
                loading: true,
                loaded: userListState.loaded,
                count: userListState.count,
                userList: [],
                limit: userListState.limit,
                offset: userListState.offset,

            });
            const accessToken = get(authenticationServiceContext, 'authUser.accessToken', '');
            const query = { limit: userListState.limit, offset: userListState.offset };
            proxyServiceContext.proxyService.getCollection('/api/user', undefined, query, accessToken)
                .then((usersResponse) => {
                    setUserListState({
                        loading: false,
                        loaded: true,
                        userList: get(usersResponse, 'users', []),
                        count: get(usersResponse, 'count', 0),
                        limit: userListState.limit,
                        offset: userListState.offset,

                    });
                }).catch((error) => {
                    if (localizationContext.isServerErrorTranslatable(error)) {
                        notificationServiceContext.handleShowErrorNotification(get(error, 'message'));
                    }
                });
        }
        modalContext.handleOnSetModalData({
            setUserListState,
            defaultState: {
                loading: false,
                loaded: false,
                limit: 16,
                offset: 0,
                count: 0,
                userList: [] as Record<any, any>[],
            }
        });
    }, [userListState]);

    const handleNavigateToUserDetail = React.useCallback((userEntity: Record<any, any>) => {
        navigate(`${t({ id: "routes.pathname.userDetail"})}/${get(userEntity, 'id', '')}`);
    }, []);

    const getSchemaByDevice = React.useCallback(() => {
        if (deviceServiceContext.isDesktop) {
            return [
                {
                    Header: t({
                        id: 'table.column.title.id',
                    }),
                    accessor: 'id',
                },
                {
                    Header: t({
                        id: 'table.column.title.email',
                    }),
                    accessor: 'email',
                },
                {
                    Header: t({
                        id: 'table.column.title.firstName',
                    }),
                    accessor: 'firstName',
                },
                {
                    Header: t({
                        id: 'table.column.title.lastName',
                    }),
                    accessor: 'lastName',
                },
                {
                    Header: t({
                        id: 'table.column.title.createdAt',
                    }),
                    accessor: 'createdAt',
                },
                {
                    Header: t({
                        id: 'table.column.title.updatedAt',
                    }),
                    accessor: 'updatedAt',
                },
            ]
        };

        if (deviceServiceContext.isTablet) {
            return [
                {
                    Header: t({
                        id: 'table.column.title.id',
                    }),
                    accessor: 'id',
                },
                {
                    Header: t({
                        id: 'table.column.title.email',
                    }),
                    accessor: 'email',
                },
                {
                    Header: t({
                        id: 'table.column.title.firstName',
                    }),
                    accessor: 'firstName',
                },
                {
                    Header: t({
                        id: 'table.column.title.lastName',
                    }),
                    accessor: 'lastName',
                },
            ]
        };

        return [
            {
                Header: t({
                    id: 'table.column.title.email',
                }),
                accessor: 'email',
            },
            {
                Header: t({
                    id: 'table.column.title.lastName',
                }),
                accessor: 'lastName',
            },
        ];
    }, [deviceServiceContext, t]);

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
                <Table
                    loading={
                        !get(userListState, 'loaded') ||
                        get(userListState, 'loading')
                    }
                    onRowClick={handleNavigateToUserDetail}
                    columns={getSchemaByDevice()}
                    data={userListState.userList}
                />
                {userListState.loaded && (
                    <Pagination
                        total={userListState.count}
                        limit={userListState.limit}
                        offset={userListState.offset}
                        onPageChange={onPageChange}
                        currentPage={currentPage}
                    />
                )}

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
            <UserListPage />
        </WithAuth>
    )
};

export default WithAuthPage;
