import * as React from 'react';

import { get } from 'lodash-es';

import ProxyService from '../ProxyService';

import {
    IProxyServiceContextModel,
    IProxyServiceProviderProps,
} from './interfaces';

const defaultProxyServiceContextModel: IProxyServiceContextModel = {
    proxyService: new ProxyService(),
};

export const ProxyServiceContext = React.createContext(defaultProxyServiceContextModel);

const ProxyServiceProvider: React.FC<IProxyServiceProviderProps> = (props): JSX.Element => {
    const proxyService = React.useMemo(() => new ProxyService(), []);
    const proxyServiceContextModel: IProxyServiceContextModel = {
        proxyService,
    };

    return (
        <ProxyServiceContext.Provider value={proxyServiceContextModel}>
            {get(props, 'children', '')}
        </ProxyServiceContext.Provider>
    );
};

export default ProxyServiceProvider;
