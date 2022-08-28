import * as React from 'react';
import Button from 'react-bootstrap/Button';
import {
    BiLogOut,
    BiLogIn,
}from 'react-icons/bi';
import {
    CgUserList
}from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';

import { AuthenticationServiceContext } from '../../../../Services/AuthenticationService';
import { LocalizationContext } from '../../../../Services/LocalizationService';
import { ModalContext } from '../../../Modal/context';
import { DeviceServiceContext } from '../../../../Services/DeviceService';

import { LOG_IN_MODAL, REGISTER_MODAL } from '../../../Modal/constanst';

import {
    getAuthButtonsWrapStyle
} from './helpers';

import './styles.css';

const AuthButtons: React.FC = (): JSX.Element => {
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);
    const localizationContext = React.useContext(LocalizationContext);
    const modalContext = React.useContext(ModalContext);
    const deviceServiceContext = React.useContext(DeviceServiceContext);

    const navigate = useNavigate();
    const t = localizationContext.useFormatMessage();

    const handleOnLogOut = React.useCallback(() => {
        authenticationServiceContext.logOut();
    }, [authenticationServiceContext]);

    const handleNavigateToLogin = React.useCallback(() => {
        navigate(`${t({ id: "routes.pathname.logIn" })}`);
    }, [t]);

    const handleNavigateToRegister = React.useCallback(() => {
        navigate(`${t({ id: "routes.pathname.registration" })}`);
    }, [t]);

    if (!authenticationServiceContext.checkedAuth) {
        return (
            <></>
        );
    }

    return (
        <div
            className="auth-buttons"
            style={getAuthButtonsWrapStyle(authenticationServiceContext.authUser.isLoggedIn)}
        >
            {(authenticationServiceContext.authUser.isLoggedIn) && (
                <Button
                    variant="dark"
                    onClick={handleOnLogOut}
                >
                    <BiLogOut
                        style={{
                            fontSize: '24px',
                            marginRight: '10px',
                        }}
                    />
                    {(!deviceServiceContext.isMobile) && t({ id: "mainMenu.button.name.logOut" })}
                </Button>
            )}
            {(!authenticationServiceContext.authUser.isLoggedIn && modalContext.modalType === REGISTER_MODAL) && (
                <Button
                    variant="success"
                    onClick={handleNavigateToLogin}
                    style={{
                        zIndex: 9999999,
                    }}
                >
                    <BiLogIn
                        style={{
                            fontSize: '24px',
                            marginRight: '10px',
                        }}
                    />
                    {(!deviceServiceContext.isMobile) && t({ id: "mainMenu.button.name.logIn" })}
                </Button>
            )}
            {(!authenticationServiceContext.authUser.isLoggedIn && modalContext.modalType === LOG_IN_MODAL) && (
                <Button
                    variant="primary"
                    onClick={handleNavigateToRegister}
                    style={{
                        zIndex: 9999999,
                    }}
                >
                    <CgUserList
                        style={{
                            fontSize: '24px',
                            marginRight: '10px',
                        }}
                    />
                    {(!deviceServiceContext.isMobile) && t({ id: "mainMenu.button.name.register" })}
                </Button>
            )}
        </div>
    );
};

export default AuthButtons;
