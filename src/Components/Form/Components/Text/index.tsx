import * as React from "react";
import { Field } from 'react-final-form';
import { get } from 'lodash-es';

import InputError from '../Error';

import { LocalizationContext } from '../../../../Services/LocalizationService';

/**
 * @category Component Input Text
 */
const InputText: React.FC<Record<any, any>> = (props): JSX.Element => {
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();
    const placeholder = get(props, 'placeholder') ? t({ id: get(props, 'placeholder') }) : 'text';
    const label = get(props, 'label') ? t({ id: get(props, 'label') }) : '';

    return (
        <Field
            name={get(props, 'name')}
            id={get(props, 'identifier')}
        >
            {(fieldPropTypes) => {
                const { input, meta } = fieldPropTypes;
                const fieldValue = (get(input, 'value') !== null) ? `${get(input, 'value', '')}` : '';

                return (
                    <div>
                        <label
                            htmlFor={get(props, 'name')}
                        >
                            {label}
                        </label>
                        <input
                            {...input}
                            value={fieldValue}
                            className="form-control"
                            type={'text'}
                            placeholder={`${placeholder}`}
                        />

                        <InputError
                            errorMessage={get(meta, 'error')}
                            touched={get(meta, 'touched', false)}
                        />
                    </div>
                );
            }}
        </Field>
    );
};

export default InputText;
