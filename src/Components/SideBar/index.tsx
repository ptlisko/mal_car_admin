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
    const [optionalListLimit, setOptionalListLimit] = React.useState<number>(16);
    const sideBarReference = React.useRef(null);
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);
    const deviceServiceContext = React.useContext(DeviceServiceContext);
    const layoutHeiht = deviceServiceContext.layoutHeiht;
    const previousLayoutHeiht = usePrevious(layoutHeiht);
    const sideBarContext = React.useContext(SideBarContext);
    const isDesktop = deviceServiceContext.isDesktop;
    const previousIsDesktop = usePrevious(isDesktop);
    const isMobile = deviceServiceContext.isMobile;
    const previousIsMobile = usePrevious(isMobile);
    const isTablet = deviceServiceContext.isTablet;
    const previousIsTablet = usePrevious(isTablet);

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
        if (sideBarReference && get(sideBarReference, 'current')) {
            const nextOptionalListLimit = Math.ceil((get(sideBarReference, 'current.clientHeight', 0) - 160) / 40);
            setOptionalListLimit(nextOptionalListLimit);
        }
    }, [sideBarReference, get(sideBarReference, 'current')]);

    React.useEffect(() => {
        if (get(sideBarReference, 'current')) {
            if (previousLayoutHeiht !== layoutHeiht) {
                const nextOptionalListLimit = Math.ceil((get(sideBarReference, 'current.clientHeight', 0) - 160) / 40);
                setOptionalListLimit(nextOptionalListLimit);
            }
        }
    }, [sideBarReference, layoutHeiht, previousLayoutHeiht]);

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
            ref={sideBarReference}
            className={cx('side-bar', {
                mobile: isMobile,
                desktop: isDesktop,
                tablet: isTablet,
            })}

        >
            <SideBarContent
                optionalListLimit={optionalListLimit}
            />
        </div>
    );
};

export default SideBar;
