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
    modalData: {},
    handleOnSetModalData: (_: Record<any, any>) => { },
};

export const ModalContext = React.createContext(defaultModalModel);

const ModalProvider: React.FC<IModalProps> = (props): JSX.Element => {
    const [modalData, setModalData] = React.useState<Record<any, any>>(get(defaultModalModel, 'modalData'));
    const [isOpened, setIsOpened] = React.useState<boolean>(get(defaultModalModel, 'isOpened', false));
    const [visiblePreloader, setVisiblePreloader] = React.useState<boolean>(get(defaultModalModel, 'visiblePreloader', false));
    const [modalType, setModalType] = React.useState<string | null>(get(defaultModalModel, 'modalType', null));

    const handleOpenModal = React.useCallback((nextModalType: string, nextModalData?: Record<any, any>) => {
        if (nextModalType !== modalType) {
            setIsOpened(true);
            setModalType(nextModalType);
            if (nextModalData) {
                setModalData(nextModalData);
            }
        }
    }, [modalType, isOpened]);

    const handleOnSetModalData = React.useCallback((nextModalData: Record<any, any>) => {
        if (nextModalData) {
            setModalData(nextModalData);
        }
    }, []);

    const handleCloseModal = React.useCallback(() => {
        setModalType(null);
        handleTogglePreloader(false);
        setIsOpened(false);
    }, [isOpened]);

    const handleTogglePreloader = React.useCallback((nextVisiblePreloader: boolean) => {
        setVisiblePreloader(nextVisiblePreloader);
    }, []);

    const modalModel: IModalModel = {
        handleOnSetModalData,
        modalData,
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