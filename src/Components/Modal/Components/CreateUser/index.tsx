import * as React from 'react';
import { get } from 'lodash-es';

import {
    Form,
    InputEmail,
    InputText,
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
const CreateUserForm: React.FC = (): JSX.Element => {
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
            submitText="form.createUser.submit"
        >
            <h3
                className='modal-title'
            >
                {t({ id: "form.createUser.title" })}
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

export default CreateUserForm;
