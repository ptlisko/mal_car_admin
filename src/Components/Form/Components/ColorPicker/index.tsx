import * as React from 'react';
import { Field } from 'react-final-form';
import { get } from 'lodash-es';
import { CFormLabel } from '@coreui/react';
import { SketchPicker } from 'react-color';

import InputError from '../Error';

import { LocalizationContext } from '../../../../Services/LocalizationService';

import './styles.css';

/**
 * @category Component Input Color Picker
 */
const InputColorPicker: React.FC<Record<any, any>> = (props): JSX.Element => {
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();
    
    return (
        <Field
            name={props.name}
            id={props.identifier}
        >
            {(fieldPropTypes) => {
                const { input, meta } = fieldPropTypes;
                return (
                    <div>
                        <CFormLabel htmlFor={props.name}>
                            {props.label ? t({ id: props.label }) : ''}
                        </CFormLabel>
                        <br />

                        <SketchPicker
                            className='admin-color-picker'
                            width='94.6%'
                            color={input.value}
                            disableAlpha
                            onChangeComplete={input.onChange}
                            onChange={input.onChange}
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

export default InputColorPicker;
