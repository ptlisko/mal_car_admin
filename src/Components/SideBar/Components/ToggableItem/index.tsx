import * as React from 'react';
import { get, map } from 'lodash-es';
import { GoPrimitiveDot } from 'react-icons/go';
import {
    FaUsers,
    FaPlusSquare,
    FaMinusSquare,
} from 'react-icons/fa';

import { LocalizationContext } from '../../../../Services/LocalizationService';

import BaseItem from '../BaseItem';

import { IToggableItemProps } from './interfaces';

import './styles.css';

const ToggableItem: React.FC<IToggableItemProps> = (props): JSX.Element => {
    const [opened, setOpened] = React.useState<boolean>(false);
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();

    const handleToggleItem = React.useCallback(() => {
        setOpened(!opened);
    }, [opened]);

    const Icon = get(props, 'icon', GoPrimitiveDot);

    return (
        <div className='side-bar-toggable-item-wrap'>
            <div
                className='side-bar-toggable-header'
                onClick={handleToggleItem}
            >
                <div className='side-bar-toggable-icon-wrap'>
                    <Icon
                        style={{
                            fontSize: '35px',
                        }}
                    />
                </div>
                <div className='side-bar-toggable-title-wrap'>
                    {t({ id: get(props, 'title') })}
                </div>
                <div className='side-bar-toggable-icon-wrap'>
                    {(opened) ? (
                        <FaMinusSquare
                            style={{
                                fontSize: '20px',
                            }}
                        />
                    ) : (
                        <FaPlusSquare
                            style={{
                                fontSize: '20px',
                            }}
                        />
                    )}
                </div>
            </div>
            {(opened) && (
                <div className='side-bar-toggable-sub-items'>
                    {map(get(props, 'items', []), (baseItem, key) => (
                        <BaseItem
                            key={`side-bar-toggable-sib-base-item-${key}`}
                            icon={get(baseItem, 'icon')}
                            title={get(baseItem, 'title')}
                            action={get(baseItem, 'action')}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default ToggableItem;
