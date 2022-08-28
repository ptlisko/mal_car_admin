import * as React from 'react';
import { get } from 'lodash-es';

import {
    IModalModel,
    IModalProps,
} from './interfaces';

const defaultModalModel: IModalModel = {
    isOpened: false,
    handleCloseModal: () => { },
    handleOpenModal: (_: string) => { },
    modalType: null,
};

export const ModalContext = React.createContext(defaultModalModel);

const ModalProvider: React.FC<IModalProps> = (props): JSX.Element => {
    const [isOpened, setIsOpened] = React.useState<boolean>(get(defaultModalModel, 'isOpened', false));
    const [modalType, setModalType] = React.useState<string | null>(get(defaultModalModel, 'modalType', null));

    const handleOpenModal = React.useCallback((nextModalType: string) => {
        if (nextModalType !== modalType) {
            setIsOpened(true);
            setModalType(nextModalType);
        }
    }, [modalType]);

    const handleCloseModal = React.useCallback(() => {
        setIsOpened(false);
        setModalType(null);
    }, []);

    const modalModel: IModalModel = {
        isOpened,
        handleOpenModal,
        handleCloseModal,
        modalType
    };

    return (
        <ModalContext.Provider
            value={modalModel}
        >
            {get(props, 'children', '')}
        </ModalContext.Provider>
    );
};

export default ModalProvider;