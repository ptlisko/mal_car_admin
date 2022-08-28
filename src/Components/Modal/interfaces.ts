import { ReactNode } from "react";

export interface IModalProps {
    children: ReactNode;
}

export interface IModalModel {
    isOpened: boolean;
    handleOpenModal: (modalType: string) => void;
    handleCloseModal: () => void;
    modalType: string | null;
    visiblePreloader: boolean;
    handleTogglePreloader: (nextVisiblePreloader: boolean) => void;
    modalData: Record<any, any>;
    handleOnSetModalData: (nextModalData: Record<any, any>) => void;
}
