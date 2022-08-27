import { RouteObject } from 'react-router-dom';

export interface IRouteProps extends Omit<RouteObject, 'path' | 'children'> {
    path: string | string[];
    children?: IRouteProps[] | RouteObject[];
}

export interface INavigateToPageProps {
    to: {
        id: string;
    };
}
