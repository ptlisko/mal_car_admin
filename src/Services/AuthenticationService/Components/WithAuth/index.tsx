import * as React from 'react';
import { get } from 'lodash-es';
import { useNavigate } from 'react-router-dom';

import { AuthenticationServiceContext } from '../../../AuthenticationService';
import { LocalizationContext } from '../../../LocalizationService';

import {
    IWithAuthProps
} from './interfaces';

const WithAuth: React.FC<IWithAuthProps> = (props): JSX.Element => {
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();
    const navigate = useNavigate();

    if (
        get(props, 'allowHost') &&
        !get(props, 'allowAuthenticated') &&
        authenticationServiceContext.authUser.isLoggedIn
    ) {
        setTimeout(() => {
            navigate(`/`);
        }, 200);
    }

    if (!authenticationServiceContext.checkedAuth) {
        return (
            <></>
        );
    }

    if (
        !get(props, 'allowHost') &&
        get(props, 'allowAuthenticated') &&
        !authenticationServiceContext.authUser.isLoggedIn
    ) {
        setTimeout(() => {
            navigate(`${t({ id: 'routes.pathname.logIn' })}`);
        }, 200);
    }

    if (
        !get(props, 'allowHost') &&
        get(props, 'allowAuthenticated') &&
        !authenticationServiceContext.authUser.isLoggedIn
    ) {
        return (
            <></>
        );
    }

    if (
        get(props, 'allowHost') &&
        !get(props, 'allowAuthenticated') &&
        !authenticationServiceContext.authUser.isLoggedIn &&
        !authenticationServiceContext.checkedAuth
    ) {
        return (
            <></>
        );
    }

    return (
        <>
            {get(props, 'children', '')}
        </>
    );
};

export default WithAuth;
