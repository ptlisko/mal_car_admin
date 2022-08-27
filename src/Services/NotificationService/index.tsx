import * as React from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { get } from 'lodash-es';

import { LocalizationContext } from '../LocalizationService';

import {
    INotificationServiceContextModel,
    INotificationServiceProviderProps,
} from './interfaces';

import Config from '../../Config';

import './styles.css';

const NotificationsDefaultConfig = get(Config, 'notifications', {});

const defaultNotificationServiceContextModel: INotificationServiceContextModel = {
    handleShowErrorNotification: (_: string, __?: Record<any, any>) => { },
    handleShowInfoNotification: (_: string, __?: Record<any, any>) => { },
    handleShowSuccessNotification: (_: string, __?: Record<any, any>) => { },
    handleShowWarningNotification: (_: string, __?: Record<any, any>) => { },
    commonNotificationsConfig: NotificationsDefaultConfig,
};

export const NotificationServiceContext = React.createContext(
    defaultNotificationServiceContextModel
);

/**
 * Notification Service Provider
 * @class NotificationsProvider
 * @return Notification Service Provider Wrapper
 */
const NotificationServiceProvider: React.FC<INotificationServiceProviderProps> = (
    props: INotificationServiceProviderProps
): JSX.Element => {
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();
    const { children } = props;

    const handleShowErrorNotification = React.useCallback(
        (message: string, customConfig = {}): void => {
            toast.error(t({ id: message }), customConfig);
        },
        [t]
    );

    const handleShowInfoNotification = React.useCallback(
        (message: string, customConfig = {}): void => {
            toast.info(t({ id: message }), customConfig);
        },
        [t]
    );

    const handleShowSuccessNotification = React.useCallback(
        (message: string, customConfig = {}): void => {
            toast.success(t({ id: message }), customConfig);
        },
        [t]
    );

    const handleShowWarningNotification = React.useCallback(
        (message: string, customConfig = {}): void => {
            toast.warning(t({ id: message }), customConfig);
        },
        [t]
    );

    const notificationsContextValues: INotificationServiceContextModel = {
        handleShowErrorNotification,
        handleShowInfoNotification,
        handleShowSuccessNotification,
        handleShowWarningNotification,
        commonNotificationsConfig: NotificationsDefaultConfig,
    };

    return (
        <NotificationServiceContext.Provider value={notificationsContextValues}>
            {children}
            <ToastContainer
                {...NotificationsDefaultConfig}
                autoClose={8000}
                icon={false}
                theme={'colored'}
                position="top-left"
            />
        </NotificationServiceContext.Provider>
    );
};

export default NotificationServiceProvider;
