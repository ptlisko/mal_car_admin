import * as React from "react";
import { get } from 'lodash-es';

import { LocalizationContext } from '../../../../Services/LocalizationService';

import { IErrorProps } from "./interfaces";

import "./styles.css";

/**
 * @category Component Input Error
 */
const InputError: React.FC<IErrorProps> = (props: IErrorProps): JSX.Element => {
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();

    return (!!get(props, 'errorMessage', null) && get(props, 'touched', false)) ?
        (
            <div
                className="input-error"
                style={{
                    height: '22px'
                }}
            >
                {t({ id: `${get(props, 'errorMessage', '')}` })}
            </div>
        ) : (
            <div
                className="input-error"
                style={{
                    height: '22px'
                }}
            >
                {` `}
            </div>
        );
};

export default InputError;
