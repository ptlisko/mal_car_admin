import * as React from 'react';
import cx from 'classnames';
import { get } from 'lodash-es';

import { AuthenticationServiceContext } from '../../Services/AuthenticationService';
import { DeviceServiceContext } from '../../Services/DeviceService';
import { SideBarContext } from './context';

import SideBarContent from './Components/SideBarContent';

import usePrevious from '../../Hooks/usePrevious';

import './styles.css';

const SideBar: React.FC = (): JSX.Element => {
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);
    const deviceServiceContext = React.useContext(DeviceServiceContext);
    const sideBarContext = React.useContext(SideBarContext);
    const isDesktop = deviceServiceContext.isDesktop;
    const previousIsDesktop = usePrevious(isDesktop);
    const isMobile = deviceServiceContext.isMobile;
    const previousIsMobile = usePrevious(isMobile);
    const isTablet = deviceServiceContext.isTablet;
    const previousIsTablet = usePrevious(isTablet);
    console.log('sideBarContext => ', sideBarContext);
    React.useEffect(() => {
        if (previousIsDesktop && !isDesktop) {
            sideBarContext.handleOnForceHideSideBar();
        }
        if (previousIsTablet && !isTablet) {
            sideBarContext.handleOnForceHideSideBar();
        }
        if (previousIsMobile && !isMobile) {
            sideBarContext.handleOnForceHideSideBar();
        }
    }, [isDesktop, previousIsDesktop, isMobile, previousIsMobile, isTablet, previousIsTablet]);

    React.useEffect(() => {
        if (!deviceServiceContext.isDesktop && sideBarContext.isOpened) {
            sideBarContext.handleOnForceHideSideBar();
        }
    }, []);

    if (!get(sideBarContext, 'isOpened', false)) {
        return <></>;
    }

    if (!get(sideBarContext, 'isOpened', false)) {
        return <></>;
    }



    if (!authenticationServiceContext.authUser.isLoggedIn) {
        return (
            <></>
        );
    }
    return (
        <div
            className={cx('side-bar', {
                mobile: isMobile,
                desktop: isDesktop,
                tablet: isTablet,
            })}

        >
            <SideBarContent />
        </div>
    );
};

export default SideBar;
