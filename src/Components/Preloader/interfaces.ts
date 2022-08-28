export type IStyle = {
    [key: string]: string;
}

export interface IContentPreloaderProps {
    height?: string | number;
    width?: string | number;
    color?: string;
    ariaLabel?: string;
    wrapperStyle?: IStyle;
    wrapperClass?: string;
    visible?: boolean;
    radius?: string | number;
}
