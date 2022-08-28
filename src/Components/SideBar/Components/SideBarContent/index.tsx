import * as React from 'react';
import Scrollbar from 'react-smooth-scrollbar';
import { useNavigate } from 'react-router-dom';
import { get, map, size } from 'lodash-es';
import {
    FaUsers,
    FaThList,
    FaMailBulk,
    FaCaravan,
    FaSmog,
    FaHome,
} from 'react-icons/fa';
import {
    TbManualGearbox,
} from 'react-icons/tb';
import {
    RiPoliceCarFill,
} from 'react-icons/ri';
import {
    BsFillInfoSquareFill,
} from 'react-icons/bs';
import {
    MdMarkEmailUnread,
    MdMarkEmailRead,
    MdContactPhone,
} from 'react-icons/md';
import {
    IoColorPaletteSharp,
    IoCarSportSharp,
    IoSettings,
} from 'react-icons/io5';
import {
    ImPlus,
} from 'react-icons/im';
import {
    GiFuelTank,
    GiCarKey,
    GiCarDoor,
    GiPocketRadio,
    GiFogLight,
    GiCarSeat,
} from 'react-icons/gi';
// import { IconType } from 'react-icons';

import { ModalContext } from '../../../Modal/context';
import { LocalizationContext } from '../../../../Services/LocalizationService';

import ToggableItem from '../ToggableItem';
import BaseItem from '../BaseItem';
import { IToggableItemProps } from '../ToggableItem/interfaces';
import { IBaseItemProps } from '../BaseItem/interfaces';
import { SideBarContext } from '../../context';
import { DeviceServiceContext } from '../../../../Services/DeviceService';
import {
    CREATE_USER_MODAL,
} from '../../../Modal/constanst';

import './styles.css';

const SideBarContent: React.FC<Record<any, any>> = (props): JSX.Element => {
    const modalContext = React.useContext(ModalContext);
    const localizationContext = React.useContext(LocalizationContext);
    const sideBarContext = React.useContext(SideBarContext);
    const deviceServiceContext = React.useContext(DeviceServiceContext);
    const optionalListLimit = get(props, 'optionalListLimit', 16);
    const t = localizationContext.useFormatMessage();
    const navigate = useNavigate();

    const handleOpenModalAction = React.useCallback((modalType: string) => () => {
        modalContext.handleOpenModal(modalType);
        if (!deviceServiceContext.isDesktop) {
            sideBarContext.handleOnForceHideSideBar();
        }
    }, [modalContext, sideBarContext, deviceServiceContext]);

    const handleOnNavigate = React.useCallback((path: string) => () => {
        navigate(path);
        if (!deviceServiceContext.isDesktop) {
            sideBarContext.handleOnForceHideSideBar();
        }
    }, [sideBarContext, deviceServiceContext]);
    
    const sideBarSchema: IToggableItemProps[] = [
        {
            title: 'sidebar.item.title.usersManagement',
            icon: FaUsers,
            items: [
                {
                    title: 'sidebar.item.title.userList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.createUser',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.messagesManagement',
            icon: FaMailBulk,
            items: [
                {
                    title: 'sidebar.item.title.unreadMessages',
                    icon: MdMarkEmailUnread,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.readMessages',
                    icon: MdMarkEmailRead,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.webManagement',
            icon: IoSettings,
            items: [
                {
                    title: 'sidebar.item.title.homePage',
                    icon: FaHome,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.aboutUs',
                    icon: BsFillInfoSquareFill,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                },
                {
                    title: 'sidebar.item.title.contact',
                    icon: MdContactPhone,
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
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.createCar',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.carBrandManagement',
            icon: GiCarKey,
            items: [
                {
                    title: 'sidebar.item.title.carBrandList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.createCarBrand',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.carModelManagement',
            icon: RiPoliceCarFill,
            items: [
                {
                    title: 'sidebar.item.title.carModelList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.createCarModel',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.carBodyManagement',
            icon: FaCaravan,
            items: [
                {
                    title: 'sidebar.item.title.carBodyList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.createCarBody',
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
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.createfuel',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.emissionStandardManagement',
            icon: FaSmog,
            items: [
                {
                    title: 'sidebar.item.title.emissionStandardList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.emissionStandardModel',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.gearBoxManagement',
            icon: TbManualGearbox,
            items: [
                {
                    title: 'sidebar.item.title.gearBoxList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.createGearBox',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.doorManagement',
            icon: GiCarDoor,
            items: [
                {
                    title: 'sidebar.item.title.doorList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.createDoor',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.carColorManagement',
            icon: IoColorPaletteSharp,
            items: [
                {
                    title: 'sidebar.item.title.carColorList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.addCarColor',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.commonEquipmentManagement',
            icon: GiPocketRadio,
            items: [
                {
                    title: 'sidebar.item.title.commonEquipmentList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.addCommonEquipment',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.carExteriorManagement',
            icon: GiCarSeat,
            items: [
                {
                    title: 'sidebar.item.title.carExteriorList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.addCarExterior',
                    icon: ImPlus,
                    action: handleOpenModalAction(CREATE_USER_MODAL),
                }
            ] as IBaseItemProps[],
        },
        {
            title: 'sidebar.item.title.carInteriorManagement',
            icon: GiFogLight,
            items: [
                {
                    title: 'sidebar.item.title.xarInteriorList',
                    icon: FaThList,
                    action: handleOnNavigate(`${t({ id: 'routes.pathname.userList' })}?limit=${optionalListLimit}&offset=0`),
                },
                {
                    title: 'sidebar.item.title.addCarInterior',
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
