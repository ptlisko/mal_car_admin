import * as React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';

import Router from '../Services/RouterService';

import ProxyServiceProvider from '../Services/ProxyService/context';
import DeviceServiceProvider from '../Services/DeviceService';
import StorageServiceProvider from '../Services/StorageService/context';
import LocalizationServiceProvider from '../Services/LocalizationService';
import NotificationServiceProvider from '../Services/NotificationService';
import ModalProvider from '../Components/Modal/context';

import './styles.css';

// Create React Quary Client
const queryClient = new QueryClient();

const MalCarApp: React.FC = (): JSX.Element => {
    return (
        <div className="mal-car-root">
            <DeviceServiceProvider>
            <QueryClientProvider client={queryClient}>
                <StorageServiceProvider>
                    <LocalizationServiceProvider>
                        <ModalProvider>
                            <NotificationServiceProvider>
                                <ProxyServiceProvider>
                                    <Router />
                                </ProxyServiceProvider>
                            </NotificationServiceProvider>
                        </ModalProvider>
                    </LocalizationServiceProvider>
                </StorageServiceProvider>
            </QueryClientProvider>
            </DeviceServiceProvider>
        </div>
    );
};

export default MalCarApp;
