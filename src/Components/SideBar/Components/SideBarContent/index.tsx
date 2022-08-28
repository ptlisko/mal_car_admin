import * as React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import { useNavigate } from 'react-router-dom';
import { get, map, size } from 'lodash-es';
import {
    FaUsers,
    FaThList,
} from 'react-icons/fa';
import {
    IoCarSportSharp,
} from 'react-icons/io5';
import {
    ImPlus,
} from 'react-icons/im';
import {
    GiFuelTank,
} from 'react-icons/gi';
// import { IconType } from 'react-icons';

import { ModalContext } from '../../../Modal/context';
import { LocalizationContext } from '../../../../Services/LocalizationService';

import ToggableItem from '../ToggableItem';
import BaseItem from '../BaseItem';
import { IToggableItemProps } from '../ToggableItem/interfaces';
import { IBaseItemProps } from '../BaseItem/interfaces';
import {
    CREATE_USER_MODAL,
} from '../../../Modal/constanst';

import './styles.css';

const SideBarContent: React.FC = (): JSX.Element => {
    const modalContext = React.useContext(ModalContext);
    const localizationContext = React.useContext(LocalizationContext);
    const t = localizationContext.useFormatMessage();
    const navigate = useNavigate();

    const handleOpenModalAction = React.useCallback((modalType: string) => () => {
        modalContext.handleOpenModal(modalType);
    }, [modalContext]);

    const handleOnNavigate = React.useCallback((path: string) => () => {
        navigate(path);
    }, [t]);

    const sideBarSchema: IToggableItemProps[] = [
        {
            title: 'sidebar.item.title.usersManagement',
            icon: FaUsers,
            items: [
                {
                    title: 'sidebar.item.title.userList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}`),
                },
                {
                    title: 'sidebar.item.title.createUser',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.carManagement',
            icon: IoCarSportSharp,
            items: [
                {
                    title: 'sidebar.item.title.carList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}`),
                },
                {
                    title: 'sidebar.item.title.createCar',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.fuelManagement',
            icon: GiFuelTank,
            items: [
                {
                    title: 'sidebar.item.title.fuelList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}`),
                },
                {
                    title: 'sidebar.item.title.createfuel',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
    ];
    
    return (
        <div className='side-bar-content'>
            <Scrollbar
            >
                {map(sideBarSchema, (schemaItem, key) => (size(get(schemaItem, 'items', [])) > 1) ? (
                    <ToggableItem
                        key={`side-bar-toggable-item-${key}`}
                        title={get(schemaItem, 'title')}
                        icon={get(schemaItem, 'icon')}
                        items={get(schemaItem, 'items', [])}
                    />
                ) : (
                    <BaseItem
                        key={`side-bar-base-item-${key}`}
                        action={get(schemaItem, 'action')}
                        title={get(schemaItem, 'title')}
                        icon={get(schemaItem, 'icon')}
                    />
                ))}
            </Scrollbar>
        </div>
    );
};

export default SideBarContent;
