import { IconType } from 'react-icons';

import { IBaseItemProps } from "../BaseItem/interfaces";

export interface IToggableItemProps {
    title: string;
    key?: string;
    icon: IconType;
    items: IBaseItemProps[];
}