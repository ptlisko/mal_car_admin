import * as React from 'react';
import { entriesIn, valuesIn, forEach, get, set, map, uniq, find, trim, includes } from 'lodash-es';
import { IntlProvider, useFormatMessage } from 'react-intl-hooks';
import { createIntl, IntlShape, MessageDescriptor, MessageFormatElement } from 'react-intl';

import { StorageServiceContext } from '../StorageService/context';

import { getBrowserLanguage } from './helpers';

import {
    ILocalizationContextModel,
    ILocalizationServiceProps,
    IMessage,
} from './interfaces';

import {
    currencies,
    countries
} from './constants';

import locale_en from './Locales/en.json';
import locale_cs from './Locales/cs.json';
import locale_sk from './Locales/sk.json';

const translations = {
    cs: locale_cs,
    en: locale_en,
    sk: locale_sk,
};

const browserLanguage = getBrowserLanguage();

/**
 * Creates object with all locale intls
 */
const loadIntls = (): Record<string, IntlShape> => {
    const intls = {};
    forEach(entriesIn(translations), ([locale, messages]) => {
        // @ts-ignore
        set(intls, `[${locale}]`, createIntl({ locale, messages }));
    });

    return intls;
};

const intls = loadIntls();




const defaultLocalizationContextValue: ILocalizationContextModel = {
    activeLanguage: browserLanguage,
    getRouteTranslateByLanguage: (_: string) => '',
    activeCurrency: find(currencies, (currency) => get(currency, 'code', 'cs') === browserLanguage) ?? { lang: 'cs', currency: 'CZK', title: 'Kč' },
    changeLanguage: (_: string) => { },
    useFormatMessage,
    useFormatMessageAll: () => (_: MessageDescriptor) => [],
    useFormatMessageAllStrings: () => (_: MessageDescriptor) => [],
    useFormatMessageFromLanguage: () => (_: string, __: MessageDescriptor) => '',
    useAllMessagesFromLanguage: () => (_: string) => ({}),
    isServerErrorTranslatable: (_: Error) => false,
    currencies,
    countries,
};

export const LocalizationContext = React.createContext(
    defaultLocalizationContextValue
);

/**
 * Localization Service Provider
 * @class LocalizationServiceProvider
 * @return JSX Component
 */
const LocalizationServiceProvider: React.FC<ILocalizationServiceProps> = (
    props
): JSX.Element => {
    const storageServiceContext = React.useContext(StorageServiceContext);
    const storageService = storageServiceContext.storageService;
    const [activeLanguage, setActiveLanguage] = React.useState(
        defaultLocalizationContextValue.activeLanguage
    );

    React.useEffect(() => {
        const storedActiveLanguage =
            storageService.getStorageItem('ACTIVE_LANGUAGE');
        if (!storedActiveLanguage) {
            storageService.setItem(
                'ACTIVE_LANGUAGE',
                activeLanguage
            );
        } else if (
            storedActiveLanguage &&
            storedActiveLanguage !== activeLanguage
        ) {
            changeLanguage(`${storedActiveLanguage}`);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeLanguage = React.useCallback(
        (nextLanguage: string): void => {
            if (activeLanguage !== nextLanguage) {
                setActiveLanguage(nextLanguage);
                storageService.setItem(
                    'ACTIVE_LANGUAGE',
                    nextLanguage
                );
            }
        },
        [activeLanguage, storageService]
    );


    const useFormatMessageAll = () => getAllLangsForMessage;

    /**
     * Get message for all languages
     */
    const getAllLangsForMessage = (props: MessageDescriptor, values: Record<string, any> = {}): IMessage[] =>
        uniq(map(entriesIn(intls), ([locale, intl]: [string, IntlShape]) => ({ lang: locale, message: intl.formatMessage(props, values) })));

    const useFormatMessageAllStrings = () => getAllLangStringsForMessage;

    /**
     * Get message strings from all languages
     * - Duplicated values are removed
     */
    const getAllLangStringsForMessage = (props: MessageDescriptor, values: Record<string, any> = {}): string[] =>
        uniq(map(valuesIn(intls), (intl: IntlShape) => intl.formatMessage(props, values)));

    const useFormatMessageFromLanguage = () => getMessageForLanguage;

    /**
     * Get message for certain language
     * @param {string} lang language code
     */
    const getMessageForLanguage = (lang: string, props: MessageDescriptor, values: Record<string, string | number | boolean> = {}): string => {
        const intl = get(intls, `[${lang}]`, createIntl({ locale: lang, messages: {} }));
        return intl.formatMessage(props, values);
    }

    const useAllMessagesFromLanguage = () => getAllMessagesForLanguage;

    const getAllMessagesForLanguage = (lang: string): Record<string, MessageFormatElement[] | string> => {
        const intl = get(intls, `[${lang}]`, createIntl({ locale: lang, messages: {} }));
        return get(intl, 'messages', {});
    }

    const activeCurrency = React.useMemo(() => {
        return find(currencies, (currency) => get(currency, 'lang', 'cs') === activeLanguage) ?? { lang: 'cs', currency: 'CZK', title: 'Kč' };
    }, [activeLanguage]);

    const getRouteTranslateByLanguage = React.useCallback((languageIndex: string, pathname: string) => {
        const currentTranslations = get(translations, activeLanguage, {});
        const currentPathName = trim(pathname, '/');
        let found = '';
        forEach(currentTranslations, (translation: string, index: string) => {
            if (translation === currentPathName && includes(index, 'routes.pathname')) {
                found = index;
            }
        });
        const nextTranslations = get(translations, languageIndex, {});

        return get(nextTranslations, found);
    }, [activeLanguage]);

    const isServerErrorTranslatable = React.useCallback((serverError: Error): boolean => {
        const errorMessage = get(serverError, 'message', '');
        const currentTranslations = get(translations, activeLanguage, {});

        return !!get(currentTranslations, errorMessage, false);
    }, [activeLanguage])

    const localizationContextValue: ILocalizationContextModel = {
        getRouteTranslateByLanguage,
        changeLanguage,
        activeLanguage,
        activeCurrency,
        useFormatMessage,
        useFormatMessageAll,
        useFormatMessageAllStrings,
        useFormatMessageFromLanguage,
        useAllMessagesFromLanguage,
        isServerErrorTranslatable,
        currencies,
        countries,
    };

    return (
        <LocalizationContext.Provider value={localizationContextValue}>
            <IntlProvider
                locale={activeLanguage}
                messages={get(translations, activeLanguage, locale_cs)}
                defaultLocale={activeLanguage}
            >
                {get(props, 'children', '')}
            </IntlProvider>
        </LocalizationContext.Provider>
    );
};

export default LocalizationServiceProvider;




