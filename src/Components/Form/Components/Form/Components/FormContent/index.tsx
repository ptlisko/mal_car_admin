import * as React from 'react';
import { get, set } from 'lodash-es';

import SubmitButton from '../../../Submit';

const FormContent: React.FC<Record<any, any>> = (props): JSX.Element => {
    const { handleSubmit, submitting, pristine, valid, form } = props;
    React.useEffect(() => {
        if (get(form, 'mutators') && get(props, 'mutatorsReference')) {
            const mutatorsReference = get(props, 'mutatorsReference');
            set(mutatorsReference, 'current', get(form, 'mutators'));
        }
    }, [get(form, 'mutators', undefined)])

    return (
        <form onSubmit={handleSubmit}>
            {get(props, 'children', '')}
            {get(props, 'submitText', null) && (
                <SubmitButton
                    valid={valid}
                    pristine={pristine}
                    submitting={submitting}
                    submitText={get(props, 'submitText', 'Submit')}
                />
            )}
            {get(props, 'customSubmitContent', null) && (
                <>
                    {get(props, 'customSubmitContent', '')()}
                </>
            )}
        </form>
    );
};

export default FormContent;