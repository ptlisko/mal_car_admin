import * as React from 'react';
import { get, isEmpty } from 'lodash-es';
import JWTDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

import { ProxyServiceContext } from '../ProxyService/context';
import { StorageServiceContext } from '../StorageService/context';
import { NotificationServiceContext } from '../NotificationService';
import { LocalizationContext } from '../LocalizationService';
import { ModalContext } from '../../Components/Modal/context';

import {
    IAuthenticationServiceModel,
    IAuthenticationServiceProps,
    IAuthUser,
} from './interfaces';

const defaultAutUser: IAuthUser = {
    isLoggedIn: false,
};

const defaultAuthenticationServiceModel: IAuthenticationServiceModel = {
    decodeJWTData: (_: string) => ({}),
    getUserMe: (_: string) => {},
    authUser: defaultAutUser,
    logOut: () => {},
    checkedAuth: false,
};

export const AuthenticationServiceContext = React.createContext(defaultAuthenticationServiceModel);

const AuthenticationServiceProvider: React.FC<IAuthenticationServiceProps> = (props): JSX.Element => {
    const [authUser, setAuthUser] = React.useState<IAuthUser>(defaultAutUser);
    const [checkedAuth, setCheckedAuth] = React.useState<boolean>(defaultAuthenticationServiceModel.checkedAuth);
    const proxyServiceContext = React.useContext(ProxyServiceContext);
    const storageServiceContext = React.useContext(StorageServiceContext);
    const notificationServiceContext = React.useContext(NotificationServiceContext);
    const localizationContext = React.useContext(LocalizationContext);
    const modalContext = React.useContext(ModalContext);
    const t = localizationContext.useFormatMessage();
    const navigate = useNavigate();
    const decodeJWTData = React.useCallback((JWTToken: string): Record<any, any> => {
        const decodedJWTTokenData: Record<any, any> = JWTDecode(JWTToken);

        return decodedJWTTokenData;
    }, []);

    const getUserMe = React.useCallback((JWTToken: string) => {
        const JWTData = decodeJWTData(JWTToken);
        if(!isEmpty(JWTData) && !!get(JWTData, 'id')) {
            return proxyServiceContext.proxyService.get('/api/auth/me', undefined, {}, JWTToken)
                .then((response) => {
                    const newAutUser: IAuthUser = {
                        isLoggedIn: true,
                        accessToken: JWTToken,
                        id: get(response, 'id'),
                        firstName: get(response, 'firstName'),
                        lastName: get(response, 'lastName'),
                        email: get(response, 'email'),
                        iat: get(response, 'iat'),
                    };
                    setAuthUser(newAutUser);
                    setCheckedAuth(true);
                    storageServiceContext.storageService.setItem('MAL_CAR_ADMIN_AUTH_USER', newAutUser);
                    notificationServiceContext.handleShowSuccessNotification('notification.logIn.success');
                    modalContext.handleCloseModal();
                    navigate('/');
                }).catch((error) => {
                    if (localizationContext.isServerErrorTranslatable(error)) {
                        notificationServiceContext.handleShowErrorNotification(get(error, 'message'));
                        setCheckedAuth(true);
                        modalContext.handleTogglePreloader(false);
                    }
                });
        }
    }, [storageServiceContext, notificationServiceContext, localizationContext, modalContext, proxyServiceContext]);

    const logOut = React.useCallback(() => {
        const newAutUser: IAuthUser = {
            isLoggedIn: false,
        };
        setAuthUser(newAutUser);
        storageServiceContext.storageService.setItem('MAL_CAR_ADMIN_AUTH_USER', newAutUser);
        notificationServiceContext.handleShowSuccessNotification('notification.logOut.success');
        navigate(`${t({ id: 'routes.pathname.logIn' })}`);	
    }, [storageServiceContext, notificationServiceContext]);

    React.useEffect(() => {
        const storedAuthUser = storageServiceContext.storageService.getStorageItem('MAL_CAR_ADMIN_AUTH_USER');
        if (
            !!get(storedAuthUser, 'isLoggedIn', false) &&
            !!get(storedAuthUser, 'accessToken', '') &&
            !!get(storedAuthUser, 'id', null) &&
            !authUser.isLoggedIn) {
                const newAuthUser: IAuthUser = {
                    isLoggedIn: true,
                    accessToken: get(storedAuthUser, 'accessToken'),
                    id: get(storedAuthUser, 'id'),
                    firstName: get(storedAuthUser, 'firstName'),
                    lastName: get(storedAuthUser, 'lastName'),
                    email: get(storedAuthUser, 'email'),
                    iat: get(storedAuthUser, 'iat'),
                };
                setAuthUser(newAuthUser);
                setCheckedAuth(true);
            } else {
                setCheckedAuth(true);
            }
    }, []);

    const authenticationServiceModel: IAuthenticationServiceModel = {
        decodeJWTData,
        getUserMe,
        authUser,
        logOut,
        checkedAuth,
    };

    return (
        <AuthenticationServiceContext.Provider
            value={authenticationServiceModel}
        >
            {get(props, 'children', '')}
        </AuthenticationServiceContext.Provider>
    );
};

export default AuthenticationServiceProvider;
