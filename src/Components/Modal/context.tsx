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
    handleTogglePreloader: (_: boolean) => { },
    visiblePreloader: false,
};

export const ModalContext = React.createContext(defaultModalModel);

const ModalProvider: React.FC<IModalProps> = (props): JSX.Element => {
    const [isOpened, setIsOpened] = React.useState<boolean>(get(defaultModalModel, 'isOpened', false));
    const [visiblePreloader, setVisiblePreloader] = React.useState<boolean>(get(defaultModalModel, 'visiblePreloader', false));
    const [modalType, setModalType] = React.useState<string | null>(get(defaultModalModel, 'modalType', null));

    const handleOpenModal = React.useCallback((nextModalType: string) => {
        if (nextModalType !== modalType) {
            setIsOpened(true);
            setModalType(nextModalType);
        }
    }, [modalType, isOpened]);

    const handleCloseModal = React.useCallback(() => {
        setModalType(null);
        handleTogglePreloader(false);
        setIsOpened(false);
    }, [isOpened]);

    const handleTogglePreloader = React.useCallback((nextVisiblePreloader: boolean) => {
        setVisiblePreloader(nextVisiblePreloader);
    }, []);

    const modalModel: IModalModel = {
        isOpened,
        handleOpenModal,
        handleCloseModal,
        modalType,
        handleTogglePreloader,
        visiblePreloader,
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