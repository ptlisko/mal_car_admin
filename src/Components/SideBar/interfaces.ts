import { ReactNode } from 'react';

export interface ISideBarModel {
    isOpened: boolean;
    handleOnToggleSideBar: () => void;
    handleOnForceHideSideBar: () => void;
    handleOnForceOpenSideBar: () => void;
}

export interface ISideBarContextProps {
    children: ReactNode;
}
