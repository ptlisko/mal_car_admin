import * as React from 'react';
import { get, set, map, forEach, isArray, isEqual, split, without, startsWith, pickBy, endsWith, keysIn, join } from 'lodash-es';
import { BrowserRouter, Navigate, useNavigate, useLocation, useRoutes, RouteObject } from 'react-router-dom';
import { QueryParamProvider } from 'use-query-params';

import AuthenticationServiceProvider from '../AuthenticationService';
import Modal from '../../Components/Modal';

import { LocalizationContext } from '../LocalizationService';

import { IRouteProps } from './interfaces';

// import NavigateToPage from './Components/NavigateToPage';
import ScrollToTop from './Components/ScrollToTop';

import Layout from '../../Components/Layout';
import DashBoardPage from "../../Pages/DashBoardPage";
import RegistrationPage from '../../Pages/RegistrationPage';
import LogInPage from '../../Pages/LogInPage';
import UserListPage from '../../Pages/UserListPage';
import UserDetailPage from '../../Pages/UserDetailPage';

/**
   * Takes custom routes and converts them recursively to React Router DOM routes
   * @param {IRouteProps[]} routes Custom routes
   * @returns {RouteObject[]} React Router DOM compatible routes
   */
const createRoutes = (routes: IRouteProps[]): RouteObject[] => {
    // Recursive iterator
    const loopOverRoutes = (routes: IRouteProps[]): RouteObject[] => {
        // Create empty new routes array 
        const newRoutes: any[] = [];
        // Add routes to newRoutes array based on path property
        forEach(routes, (route: IRouteProps) => {
            if (isArray(get(route, 'path', undefined))) {
                // If path is array, create route for each path
                newRoutes.push(...map(get(route, 'path', []), (path: string) => ({ ...route, path })));
            } else {
                newRoutes.push({ ...route });
            }
        });
        // If children are setted, iterate over them and repeat
        forEach(newRoutes, (route) => {
            if (get(route, 'children', false)) {
                set(route, 'children', loopOverRoutes(get(route, 'children')));
            }
        });
        return newRoutes;
    }
    return loopOverRoutes(routes);
}

const Routing: React.FC = () => {
    const localizationContext = React.useContext(LocalizationContext);
    const tAll = localizationContext.useFormatMessageAllStrings();
    
    const routes = React.useMemo(() => createRoutes([
        { path: '/', element: <DashBoardPage /> },
        { path: tAll({ id: 'routes.pathname.registration' }), element: <RegistrationPage /> },
        { path: tAll({ id: 'routes.pathname.logIn' }), element: <LogInPage /> },
        { path: tAll({ id: 'routes.pathname.userList' }), element: <UserListPage /> },
        {
            path: tAll({ id: 'routes.pathname.userDetail' }), children: [
                { path: ':userId', element: <UserDetailPage /> },
                { path: '', element: <Navigate to={'/'} /> },
            ]
        },

        // Error Pages
        // { path: '*', element: <NotFoundPage /> },
    ]), []);

    return useRoutes(routes);
}

/**
 * Browser Router Service
 * @class RoutingService
 * @return JSX Router Component
 */
const RoutingService: React.FunctionComponent = (): JSX.Element => {
    const localizationContext = React.useContext(LocalizationContext);
    const lAll = localizationContext.useAllMessagesFromLanguage();
    const navigate = useNavigate();
    const location = useLocation();
    const activeLanguage = get(localizationContext, 'activeLanguage', null);
    const prevLanguage = React.useRef('');

    React.useEffect(() => {
        // If both previous language and active language are defined
        if (get(prevLanguage, 'current', '') && activeLanguage) {
            // Split pathname by "/" and remove empty string
            const splittedPathname = without(split(get(location, 'pathname', ''), '/'), '');
            // Get all routes from previous language
            const prevRouteLangs = pickBy(lAll(get(prevLanguage, 'current')), (_, key) => startsWith(key, 'routes') && endsWith(key, 'route'));
            // Get all routes from active language
            const activeRouteLangs = pickBy(lAll(activeLanguage), (_, key) => startsWith(key, 'routes') && endsWith(key, 'route'));
            // Generate new pathname
            const newPathname = map(splittedPathname, (pathPart) => {
                const pathKey = get(keysIn(pickBy(prevRouteLangs, (message) => isEqual(message, pathPart))), '[0]', null);
                if (!pathKey) return pathPart;
                const activeLangPathPart = get(activeRouteLangs, `${pathKey}`, null);
                if (activeLangPathPart) return activeLangPathPart;
                return pathPart;
            })
            // Navigate to new URL, don't add to history
            navigate(`${join(newPathname, '/')}${get(location, 'search', '')}`, { replace: true });
        }
        // Store prev language on change
        set(prevLanguage, 'current', activeLanguage);
    }, [activeLanguage]);

    return (
        <>
            <ScrollToTop />
            <Routing />
        </>
    );
};

// Create Params Query Client
const RouteAdapter = (props: { children?: React.ReactNode }) => {
    const children: any = get(props, 'children', '');
    const navigate = useNavigate();
    const location = useLocation();

    const adaptedHistory = React.useMemo(
        () => ({
            replace(location: Location) {
                navigate(location, { replace: true, state: get(location, 'state') });
            },
            push(location: Location) {
                navigate(location, { replace: false, state: get(location, 'state') });
            },
        }),
        [navigate]
    );
    return children({ history: adaptedHistory, location });
};

/**
 * Browser Router High Order Wrapper
 * @class ConnectedBrowserRouter
 * @return JSX Browser Router Component
 */
const ConnectedBrowserRouter: React.FC = (): JSX.Element => {
    return (
        <BrowserRouter>
            <AuthenticationServiceProvider>
                <Layout>
                    {/* @ts-ignore */}
                    <QueryParamProvider ReactRouterRoute={RouteAdapter}>
                        <RoutingService />
                        <Modal />
                    </QueryParamProvider>
                </Layout>
            </AuthenticationServiceProvider>
        </BrowserRouter>
    );
};

export default ConnectedBrowserRouter;
