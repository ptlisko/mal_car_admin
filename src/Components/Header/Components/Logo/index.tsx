import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import { LocalizationContext } from '../../../../Services/LocalizationService';
import { AuthenticationServiceContext } from '../../../../Services/AuthenticationService';
import { DeviceServiceContext } from '../../../../Services/DeviceService';

import './styles.css';
// mainMenu.appTitle.short
const Logo: React.FC = (): JSX.Element => {
    const localizationContext = React.useContext(LocalizationContext);
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);
    const deviceServiceContext = React.useContext(DeviceServiceContext);

    const t = localizationContext.useFormatMessage();
    const navigate = useNavigate();
    const handleMoveToHomePage = React.useCallback(() => {
        if (authenticationServiceContext.authUser.isLoggedIn) {
            navigate('/');
        }
    }, [authenticationServiceContext]);

    return (
        <div
            className='mal-car-header-logo'
            onClick={handleMoveToHomePage}
        >
            {(!deviceServiceContext.isMobile) ?
                t({ id: "mainMenu.appTitle" }) :
                t({ id: "mainMenu.appTitle.short" })}
        </div>
    );
};

export default Logo;
