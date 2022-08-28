import * as React from "react";
import { Form } from 'react-final-form';
import { get, set } from 'lodash-es';

import FormContent from './Components/FormContent';

import { IFormProps } from "./interfaces";

// import "./styles.scss";

/**
 * @category Component Form
 */
const FormComponent: React.FC<IFormProps> = (props: any): JSX.Element => {
    const submitCallback = get(props, 'submitCallback', null);
    const validationFunction = get(props, 'customValidationFunction', null);

    const customValidationFunction = React.useCallback(
        (values?: Record<any, any>): Record<any, any> => {
            if (validationFunction) {
                return validationFunction(values)
            }

            return {};
        }, [validationFunction]);

    const handleOnSubmit = React.useCallback((formValues: Record<any, any>): void => {
        if (submitCallback) {
            submitCallback(formValues);
        }
    }, [submitCallback]);

    return (
        <Form
            onSubmit={handleOnSubmit}
            validate={customValidationFunction}
            mutators={get(props, 'mutators', {})}
            initialValues={get(props, 'initializationValues', {})}
            render={(formRenderPropTypes: Record<any, any>) => {
                return (
                    <FormContent
                        {...formRenderPropTypes}
                        {...props}
                    />
                );
            }}
        />
    );
};

export default FormComponent;
