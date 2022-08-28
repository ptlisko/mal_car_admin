import {
    LOG_IN_MODAL,
    REGISTER_MODAL,
} from './constanst';

import RegisterForm from './Components/RegisterForm';
import LogInForm from './Components/LogInForm';

export const getModalContentByType = (modalType: string | null) => {
    if (modalType === REGISTER_MODAL) {
        return RegisterForm;
    } else if (modalType) {
        return LogInForm;
    }

    return null;
};

export const getModalWidthByDevice = (isMobile: boolean, isTablet: boolean, layoutWidth: number) => {
    if (isMobile) {
        return Math.ceil(layoutWidth / 100 * 90);
    }

    if (isTablet) {
        return Math.ceil(layoutWidth / 100 * 75);
    }

    return Math.ceil(layoutWidth / 2);
}
