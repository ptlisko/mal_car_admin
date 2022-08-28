import * as React from 'react';
import cx from 'classnames';
import { get, random, size } from 'lodash-es';
import * as ReactButgers from 'react-burgers';

import { SideBarContext } from '../../../SideBar/context';
import { AuthenticationServiceContext } from '../../../../Services/AuthenticationService';
import { DeviceServiceContext } from '../../../../Services/DeviceService';

import './styles.css';

const list: string[] = [
    'Boring',
    'Collapse',
    'CollapseReverse',
    'Elastic',
    'ElasticReverse',
    'Emphatic',
    'PerspectiveX',
    'PerspectiveXReverse',
    'PerspectiveY',
    'PerspectiveYReverse',
    'PerspectiveXY',
    'PerspectiveXYReverse',
    'Slider',
    'SliderReverse',
    'Spin',
    'SpinReverse',
    'Spring',
    'SpringReverse',
    'Squeeze',
    'Stand',
    'StandReverse',
    'Vortex',
    'VortexReverse',
];

/**
 * @category Component Admin Burger
 */
const Burger: React.FC<Record<any, any>> = (_: Record<any, any>): JSX.Element => {
    const [randomIndex] = React.useState(random(0, size(list) - 1));
    const sideBarContext = React.useContext(SideBarContext);
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);
    const deviceServiceContext = React.useContext(DeviceServiceContext);
    const CurrentBurgerIcon = get(ReactButgers, `${list[randomIndex]}`, ReactButgers.Slider);

    const handleOnBurgerClick = React.useCallback(() => {
        if (!get(sideBarContext, 'isOpened', false)) {
            sideBarContext.handleOnForceOpenSideBar();
        }
        if (get(sideBarContext, 'isOpened', true)) {
            sideBarContext.handleOnForceHideSideBar();
        }
    }, [sideBarContext]);

    if (!authenticationServiceContext.authUser.isLoggedIn) {
        return (<></>);
    }

    const getLeft = () => {
        if (deviceServiceContext.isDesktop) {
            if (get(sideBarContext, 'isOpened', true)) {
                return '310px';
            }
            if (!get(sideBarContext, 'isOpened', true)) {
                return '6px';
            }
        }
        if (!deviceServiceContext.isDesktop) {
            if (get(sideBarContext, 'isOpened', true)) {
                return 'auto';
            }
            if (!get(sideBarContext, 'isOpened', true)) {
                return '6px';
            }
        }

        return 'auto';
    };

    const getRight = () => {
        if (!deviceServiceContext.isDesktop) {
            if (get(sideBarContext, 'isOpened', true)) {
                return '6px';
            }
            if (!get(sideBarContext, 'isOpened', true)) {
                return 'auto';
            }
        }

        return 'auto';
    };

    return (
        <div
            className={cx('admin-burger', {
                'is-opened': get(sideBarContext, 'isOpened', true)
            })}
            style={{
                left: getLeft(),
                right: getRight(),
            }}
            onClick={handleOnBurgerClick}
        >
            <CurrentBurgerIcon
                active={sideBarContext.isOpened}
                width={40}
                lineHeight={5}
                lineSpacing={4}
                color='black'
                borderRadius={12}
                padding='5px'
            />
        </div>
    );
};

export default Burger;
