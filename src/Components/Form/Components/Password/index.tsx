import * as React from "react";
import { Field } from 'react-final-form';
import { get } from 'lodash-es';

import InputError from '../Error';
import ShowPasswordIcon from './Components/ShowPasswordIcon';
import HidePasswordIcon from './Components/HidePasswordIcon';

import FormValidators from '../../validators';

import { LocalizationContext } from '../../../../Services/LocalizationService';

import { IPasswordProps } from "./interfaces";

import {
    FIELD_IDENTIFIER,
    FIELD_NAME,
    FIELD_PASSWORD_TYPE,
    FIELD_TEXT_TYPE,
    FIELD_SECOND_IDENTIFIER,
    FIELD_SECOND_NAME,
    PASSWORD_TYPE,
    LOGIN_PASSWORD_TYPE,
    CONFIRM_PASSWORD_TYPE,
} from './constants';

// import "./styles.scss";

const {
    validatePassword,
    requirePassword,
    composeValidators,
} = FormValidators;

/**
 * @category Component Input Password
 */
const InputPassword: React.FC<IPasswordProps> = (props: IPasswordProps): JSX.Element => {
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();
    const [isPasswordVisible, setIsPasswordVisible] = React.useState<boolean>(false);
    const passwordType = get(props, 'type', PASSWORD_TYPE);
    const label = get(props, 'label', null);
    const readonly = get(props, 'readonly', false);
    const isShowPasswordToggle = get(props, 'showPasswordToggle', true);
    const customName = get(props, 'name');
    const customId = get(props, 'id');

    const handleSetIsPaswordVisible = React.useCallback(() => {
        setIsPasswordVisible(!isPasswordVisible);
    }, [isPasswordVisible]);

    const getPasswordValidationByType = React.useCallback(() => {
        if (passwordType === LOGIN_PASSWORD_TYPE) {
            return composeValidators(requirePassword)
        } else if (passwordType === PASSWORD_TYPE) {
            return composeValidators(requirePassword, validatePassword);
        } else if (passwordType === CONFIRM_PASSWORD_TYPE) {
            return composeValidators(requirePassword)
        }

        return undefined;
    }, [passwordType]);

    const fieldName = React.useMemo(
        () => customName ?? ((passwordType === PASSWORD_TYPE || passwordType === LOGIN_PASSWORD_TYPE) ? FIELD_NAME : FIELD_SECOND_NAME),
        [customName, passwordType]
    );
    const fieldId = React.useMemo(
        () => customId ?? ((passwordType === PASSWORD_TYPE || passwordType === LOGIN_PASSWORD_TYPE) ? FIELD_IDENTIFIER : FIELD_SECOND_IDENTIFIER),
        [customId, passwordType]
    );

    return (
        <Field
            name={fieldName}
            id={fieldId}
            validate={getPasswordValidationByType()}
        >
            {(fieldPropTypes) => {
                const { input, meta } = fieldPropTypes;
                const fieldValue = (get(input, 'value') !== null) ? `${get(input, 'value', '')}` : '';

                return (
                    <div className="position-relative">
                        <label
                            htmlFor={fieldId}
                        >
                            {label ? label : (passwordType === PASSWORD_TYPE || passwordType === LOGIN_PASSWORD_TYPE) ?
                                t({ id: 'form.input.password.label' }) :
                                t({ id: 'form.input.confirmPassword.label' })
                            }
                        </label>
                        <input
                            {...input}
                            value={fieldValue}
                            id={fieldId}
                            className="form-control vinisto-input"
                            type={isPasswordVisible ? FIELD_TEXT_TYPE : FIELD_PASSWORD_TYPE}
                            placeholder={(passwordType === PASSWORD_TYPE || passwordType === LOGIN_PASSWORD_TYPE) ?
                                `${t({ id: 'form.input.password.placeholder' })}` :
                                `${t({ id: 'form.input.confirmPassword.placeholder' })}`
                            }
                            readOnly={readonly}
                        />
                        {isShowPasswordToggle &&
                            <div
                                className="vinisto-popup__show-password"
                                onClick={handleSetIsPaswordVisible}
                            >
                                {(!isPasswordVisible) ? (
                                    <HidePasswordIcon />
                                ) : (
                                    <ShowPasswordIcon />
                                )}
                            </div>}

                        <InputError
                            errorMessage={get(meta, 'error') || get(meta, 'submitError')}
                            touched={get(meta, 'touched', false)}
                        />
                    </div>
                );
            }}
        </Field>
    );
};

export default InputPassword;
