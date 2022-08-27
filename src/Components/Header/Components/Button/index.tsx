import * as React from 'react';
import { get } from 'lodash-es';
import { useNavigate } from 'react-router-dom';

import { LocalizationContext } from '../../../../Services/LocalizationService';

import { IButtonProps } from './interfaces';

import './styles.css';


const Button: React.FC<IButtonProps> = (props): JSX.Element => {
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();
    const navigate = useNavigate();
    const handleMoveToPage = React.useCallback(() => {
        navigate(`${t({ id: get(props, 'id', '') })}`);
    }, [get(props, 'path', ''), t], );

    return (
        <div
            className='mal-car-header-button'
            onClick={handleMoveToPage}
        >
            {t({ id:get(props, 'title', '') })}
        </div>
    );
};

export default Button;
