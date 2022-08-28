import * as React from 'react';
import { get } from 'lodash-es';
import { useNavigate } from 'react-router-dom';

import {
    Form,
    InputEmail,
    InputText,
    InputPassword,
} from '../../../Form';

import { ProxyServiceContext } from '../../../../Services/ProxyService/context';
import { LocalizationContext } from '../../../../Services/LocalizationService';
import { NotificationServiceContext } from '../../../../Services/NotificationService';
import { ModalContext } from '../../context';

import {
    PASSWORD_TYPE,
} from '../../../Form/Components/Password/constants';

// test1@gmail.com 123456
const RegisterForm: React.FC = (): JSX.Element => {
    const proxyServiceContext = React.useContext(ProxyServiceContext);
    const localizationContext = React.useContext(LocalizationContext);
    const notificationServiceContext = React.useContext(NotificationServiceContext);
    const modalContext = React.useContext(ModalContext);
    const navigate = useNavigate();
    const t = localizationContext.useFormatMessage();

    const handleOnRegister = React.useCallback((formData: Record<any, any>) => {
        modalContext.handleTogglePreloader(true);
        proxyServiceContext.proxyService.post('/api/auth/register', formData)
            .then(() => {
                notificationServiceContext.handleShowSuccessNotification('notification.registration.success');
                modalContext.handleTogglePreloader(false);
                navigate(`${t({ id: 'routes.pathname.logIn' })}`);
            }).catch((error) => {
                if (localizationContext.isServerErrorTranslatable(error)) {
                    notificationServiceContext.handleShowErrorNotification(get(error, 'message'));
                    modalContext.handleTogglePreloader(false);
                }
            })
    }, []);

    return (
        <Form
            submitCallback={handleOnRegister}
            submitText="form.registration.submit"
        >
            <h3
                className='modal-title'
            >
                {t({ id: "form.registration.title" })}
            </h3>
            <InputText
                name="firstName"
                identifier="firstName"
                placeholder="form.registration.firstName.placeholder"
                label="form.registration.firstName.label"
            />
            <InputText
                name="lastName"
                identifier="lastName"
                placeholder="form.registration.lastName.placeholder"
                label="form.registration.lastName.label"
            />
            <InputEmail />

            <InputPassword type={PASSWORD_TYPE} />
        </Form>
    );
};

export default RegisterForm;
