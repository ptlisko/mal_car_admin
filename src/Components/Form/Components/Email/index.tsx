import * as React from "react";
import { Field } from 'react-final-form';
import { get } from 'lodash-es';

import InputError from '../Error';

import { LocalizationContext } from '../../../../Services/LocalizationService';

import FormValidators from '../../validators';

import { IEmailProps } from "./interfaces";

import {
  FIELD_IDENTIFIER,
  FIELD_NAME,
  FIELD_TYPE,
  FIELD_LABEL
} from './constants';

const {
  validateEmail,
  requireEmail,
  composeValidators,
} = FormValidators;

/**
 * @category Component Input Email
 */
const InputEmail: React.FC<IEmailProps> = (props: IEmailProps): JSX.Element => {
  const localizationContext = React.useContext(LocalizationContext);
  const t = localizationContext.useFormatMessage();
  const label = get(props, 'label', null)
  const readonly = get(props, 'readonly', false);
  const className = get(props, 'className', '');

  return (
    <Field
      name={FIELD_NAME}
      id={FIELD_IDENTIFIER}
      validate={composeValidators(requireEmail, validateEmail)}
    >
      {(fieldPropTypes) => {
        const { input, meta } = fieldPropTypes;
        const fieldValue = (get(input, 'value') !== null) ? `${get(input, 'value', '')}` : '';

        return (
          <div className={className}>
            <label
              htmlFor={FIELD_LABEL}
            >
              {label ? label : t({ id: 'form.input.email.label' })}
            </label>
            <input
              {...input}
              value={fieldValue}
              className="form-control vinisto-input"
              type={FIELD_TYPE}
              placeholder={`${t({ id: 'form.input.email.placeholder' })}`}
              readOnly={readonly}
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

export default InputEmail;
