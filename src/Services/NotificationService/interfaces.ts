import { ReactNode } from 'react';

export interface INotificationServiceContextModel {
    handleShowErrorNotification: (message: string, customConfig?: Record<any, any>) => void;
    handleShowInfoNotification: (message: string, customConfig?: Record<any, any>) => void;
    handleShowSuccessNotification: (message: string, customConfig?: Record<any, any>) => void;
    handleShowWarningNotification: (message: string, customConfig?: Record<any, any>) => void;
    commonNotificationsConfig: Record<any, any>;
}

export interface INotificationServiceProviderProps {
    children: ReactNode;
}
