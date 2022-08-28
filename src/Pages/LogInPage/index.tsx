import * as React from 'react';

import WithAuth from '../../Services/AuthenticationService/Components/WithAuth';

import { ModalContext } from '../../Components/Modal/context';
import { AuthenticationServiceContext } from '../../Services/AuthenticationService';

import { LOG_IN_MODAL } from '../../Components/Modal/constanst';

import './styles.css';

const LogInPage: React.FC = (): JSX.Element => {
    const modalContext = React.useContext(ModalContext);
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);

    React.useEffect(() => {
        if (!authenticationServiceContext.authUser.isLoggedIn) {
            modalContext.handleOpenModal(LOG_IN_MODAL);
        }
    }, [authenticationServiceContext, modalContext]);

    return (
        <div>
        </div>
    );
};

const WithAuthPage: React.FC = (): JSX.Element => {
    return (
        <WithAuth
            allowAuthenticated={false}
            allowHost={true}
        >
            <LogInPage />
        </WithAuth>
    )
};

export default WithAuthPage;
