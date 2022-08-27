import * as React from 'react';
import { get } from 'lodash-es';

import StorageService from '../StorageService';

import {
    IStorageServiceProps,
    IStorageServiceContextModel,
} from './interfaces';

const defaultStorageServiceContextModel: IStorageServiceContextModel = {
    storageService: new StorageService(),
};

export const StorageServiceContext = React.createContext(defaultStorageServiceContextModel);

const StorageServiceProvider: React.FC<IStorageServiceProps> = (props): JSX.Element => {
    const storageService = React.useMemo(() => new StorageService(), []);
    const storageServiceContextModel: IStorageServiceContextModel = {
        storageService,
    };

    return (
        <StorageServiceContext.Provider value={storageServiceContextModel}>
            {get(props, 'children', '')}
        </StorageServiceContext.Provider>
    );
};

export default StorageServiceProvider;
