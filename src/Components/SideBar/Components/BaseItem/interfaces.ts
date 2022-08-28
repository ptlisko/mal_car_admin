import { IconType } from 'react-icons';

export interface IBaseItemProps {
    title: string;
    action: () => void;
    key?: string;
    icon: IconType;
}