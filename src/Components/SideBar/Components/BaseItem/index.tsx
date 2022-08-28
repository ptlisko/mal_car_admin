import * as React from 'react';
import { get } from 'lodash-es';
import { GoPrimitiveDot } from 'react-icons/go';

import { LocalizationContext } from '../../../../Services/LocalizationService';

import { IBaseItemProps } from './interfaces';

import './styles.css';

const BaseItem: React.FC<IBaseItemProps> = (props: IBaseItemProps): JSX.Element => {
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();

    const handleOnAction = React.useCallback(() => {
        const action = get(props, 'action');
        if (action) {
            action();
        }
    }, [props]);

    const Icon = get(props, 'icon', GoPrimitiveDot);

    return (
        <div
            onClick={handleOnAction}
            className='side-bar-base-item'
        >
            <div className='side-bar-base-item-icon-wrap'>
                <Icon
                    style={{
                        fontSize: '22px',
                    }}
                />
            </div>
            <div className='side-bar-base-item-title-wrap'>
                {t({ id: get(props, 'title') })}
            </div>
        </div>
    );
};

export default BaseItem;
