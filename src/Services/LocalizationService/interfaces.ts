import { ReactNode } from "react";
import { MessageDescriptor, MessageFormatElement } from "react-intl";
import { useFormatMessage } from "react-intl-hooks";

export interface ILocalizationServiceProps {
    children: ReactNode;
}

export interface IMessage {
    lang: string;
    message: string;
}

export interface ICurrency {
    lang: string;
    currency: string;
    title: string;
}

export interface ILocalizationContextModel {
    activeLanguage: string;
    activeCurrency: ICurrency;
    getRouteTranslateByLanguage: (nextLanguage: string, pathname: string) => string;
    changeLanguage: (nextLanguage: string) => void;
    useFormatMessage: typeof useFormatMessage;
    useFormatMessageAll: () => (props: MessageDescriptor, values?: {}) => IMessage[];
    useFormatMessageAllStrings: () => (props: MessageDescriptor, values?: {}) => string[];
    useFormatMessageFromLanguage: () => (lang: string, props: MessageDescriptor, values?: {}) => string;
    useAllMessagesFromLanguage: () => (lang: string) => Record<string, MessageFormatElement[] | string>;
    isServerErrorTranslatable: (serverError: Error) => boolean;
    currencies: ICurrency[];
    countries: ICountry[];
}

export interface ICountry {
    code: string;
    title: string;
    lang: string;
}
