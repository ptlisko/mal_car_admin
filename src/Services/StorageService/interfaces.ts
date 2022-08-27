import { ReactNode } from 'react';

import StorageService from './index';

export interface IStorageServiceProps {
    children: ReactNode;
}

export interface IStorageServiceContextModel {
    storageService: StorageService;
}

export type Serializer<T> = (object: T | undefined) => string;

export type Parser<T> = (val: string) => T | undefined;

export type Setter<T> = React.Dispatch<React.SetStateAction<T | undefined>>;

export type Options<T> = Partial<{
    serializer: Serializer<T>;
    parser: Parser<T>;
    logger: (error: any) => void;
    syncData: boolean;
}>;
