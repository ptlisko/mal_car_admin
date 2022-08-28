import * as React from 'react';

import WithAuth from '../../Services/AuthenticationService/Components/WithAuth';

import { ModalContext } from '../../Components/Modal/context';
import { AuthenticationServiceContext } from '../../Services/AuthenticationService';

import { REGISTER_MODAL } from '../../Components/Modal/constanst';

import './styles.css';

const RegistrationPage: React.FC = (): JSX.Element => {
    const modalContext = React.useContext(ModalContext);
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);

    React.useEffect(() => {
        if(!authenticationServiceContext.authUser.isLoggedIn) {
            modalContext.handleOpenModal(REGISTER_MODAL);
        }
    }, [authenticationServiceContext]);

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
            <RegistrationPage />
        </WithAuth>
    )
};

export default WithAuthPage;
