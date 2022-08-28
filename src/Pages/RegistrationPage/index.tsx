import * as React from 'react';

import { ModalContext } from '../../Components/Modal/context';
import { REGISTER_MODAL } from '../../Components/Modal/constanst';

import './styles.css';

const RegistrationPage: React.FC = (): JSX.Element => {
    const modalContext = React.useContext(ModalContext);

    React.useEffect(() => {
        modalContext.handleOpenModal(REGISTER_MODAL);
    }, []);

    return (
        <div>
        </div>
    );
};

export default RegistrationPage;
