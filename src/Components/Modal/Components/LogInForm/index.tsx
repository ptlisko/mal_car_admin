import * as React from 'react';
import { get } from 'lodash-es';

import {
    Form,
    InputEmail,
    InputPassword,
} from '../../../Form';

import { ProxyServiceContext } from '../../../../Services/ProxyService/context';
import { LocalizationContext } from '../../../../Services/LocalizationService';
import { NotificationServiceContext } from '../../../../Services/NotificationService';
import { AuthenticationServiceContext } from '../../../../Services/AuthenticationService';
import { ModalContext } from '../../context';

import {
    PASSWORD_TYPE,
} from '../../../Form/Components/Password/constants';

// test1@gmail.com 123456
const LogInForm: React.FC = (): JSX.Element => {
    const proxyServiceContext = React.useContext(ProxyServiceContext);
    const localizationContext = React.useContext(LocalizationContext);
    const notificationServiceContext = React.useContext(NotificationServiceContext);
    const authenticationServiceContext = React.useContext(AuthenticationServiceContext);
    const modalContext = React.useContext(ModalContext);

    const t = localizationContext.useFormatMessage();

    const handleOnLogIn = React.useCallback((formData: Record<any, any>) => {
        modalContext.handleTogglePreloader(true);
        proxyServiceContext.proxyService.post('/api/auth/login', formData)
            .then((response) => {
                authenticationServiceContext.getUserMe(`${response}`);
            }).catch((error) => {
                if (localizationContext.isServerErrorTranslatable(error)) {
                    notificationServiceContext.handleShowErrorNotification(get(error, 'message'));
                    modalContext.handleTogglePreloader(false);
                }
            })
    }, []);

    return (
        <Form
            submitCallback={handleOnLogIn}
            submitText="form.logIn.submit"
        >
            <h3
                className='modal-title'
            >
                {t({ id: "form.logIn.title" })}
            </h3>
            <InputEmail />

            <InputPassword type={PASSWORD_TYPE} />
        </Form>
    );
};

export default LogInForm;
