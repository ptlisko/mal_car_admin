import * as React from "react";
import { Field } from 'react-final-form';
import { get } from 'lodash-es';

import InputError from '../Error';

import { LocalizationContext } from '../../../../Services/LocalizationService';

import { ICheckBoxProps } from "./interfaces";

import { FIELD_TYPE } from './constants';

/**
 * @category Component Input CheckBox
 */
const InputCheckBox: React.FC<ICheckBoxProps> = (props: ICheckBoxProps): JSX.Element => {
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();

    return (
        <Field
            name={props.name}
            type={FIELD_TYPE}
        >
            {(fieldPropTypes) => {
                const { input, meta } = fieldPropTypes;

                return (
                    <label
                        className="vinisto-popup__checkbox"
                        htmlFor={props.identifier}
                    >
                        {get(props, 'label', false) ? t({ id: `${get(props, 'label', '')}` }) : ''}
                        <input
                            id={props.identifier}
                            {...input}
                            type={FIELD_TYPE}
                        />

                        <span className="vinisto-popup__checkmark"></span>
                        <InputError
                            errorMessage={get(meta, 'error')}
                            touched={get(meta, 'touched', false)}
                        />
                    </label>
                );
            }}
        </Field>
    );
};

export default InputCheckBox;
