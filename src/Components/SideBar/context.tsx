import * as React from 'react';
import { get } from 'lodash-es';

import { ISideBarModel, ISideBarContextProps } from './interfaces';

const defaultSideBarModel: ISideBarModel = {
    isOpened: true,
    handleOnToggleSideBar: () => { },
    handleOnForceHideSideBar: () => { },
    handleOnForceOpenSideBar: () => { },
};

export const SideBarContext = React.createContext(defaultSideBarModel);

const SideBarContextProvider: React.FC<ISideBarContextProps> = (props): JSX.Element => {
    const [sideBarState, setSideBarState] = React.useState({ isOpened: true });

    const handleOnToggleSideBar = React.useCallback(() => {
        setSideBarState({
            isOpened: !get(sideBarState, 'isOpened', false),
        });
    }, [sideBarState]);

    const handleOnForceHideSideBar = React.useCallback(() => {
        if (sideBarState.isOpened) {
            setSideBarState({ isOpened: false });
        }
    }, [sideBarState.isOpened]);

    const handleOnForceOpenSideBar = React.useCallback(() => {
        if (!sideBarState.isOpened) {
            setSideBarState({ isOpened: true });
        }
    }, [sideBarState.isOpened]);

    return (
        <SideBarContext.Provider value={{
            ...sideBarState,
            handleOnToggleSideBar,
            handleOnForceHideSideBar,
            handleOnForceOpenSideBar,
        }}>
            {get(props, 'children', '')}
        </SideBarContext.Provider>
    );
};

export default SideBarContextProvider;
