import { get, split, head, find } from "lodash-es";

import { currencies } from './constants';
import { ICurrency } from './interfaces';

export const getBrowserLanguage = (): string => {
    const browserLanguage = head(
        split(get(navigator, "language", "en_EN"), /[-_]/)
    );

    const foundRelevantLanguage = !!find(currencies, (currency: ICurrency) => (currency.lang === browserLanguage));

    return foundRelevantLanguage ? `${browserLanguage}` : 'sk';
};
