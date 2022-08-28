import * as React from 'react';

import { ModalContext } from '../../Components/Modal/context';
import { LOG_IN_MODAL } from '../../Components/Modal/constanst';

import './styles.css';

const LogInPage: React.FC = (): JSX.Element => {
    const modalContext = React.useContext(ModalContext);

    React.useEffect(() => {
        modalContext.handleOpenModal(LOG_IN_MODAL);
    }, []);

    return (
        <div>
        </div>
    );
};

export default LogInPage;
