import { ReactNode } from "react";

export interface IFormProps {
    children: ReactNode;
    submitCallback?: (formValues: Record<any, any>) => void;
    submitText?: string;
    customValidationFunction?: (values: Record<any, any>) => Record<any, any>;
    initializationValues?: Record<any, any>;
    customSubmitContent?: ReactNode;
    mutators?: Record<any, any>;
    mutatorsReference?: React.MutableRefObject<{}>;
}
