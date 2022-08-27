import { ICountry, ICurrency } from './interfaces';

export const countries: Array<ICountry> = [
    { code: 'cs', title: 'Čeština', lang: 'cs' },
    { code: 'gb', title: 'English', lang: 'en' },
    { code: 'sk', title: 'Slovencina', lang: 'sk' },
];


export const currencies: ICurrency[] = [
    { lang: 'cs', currency: 'CZK', title: 'Kč' },
    { lang: 'en', currency: 'EUR', title: '€' },
    { lang: 'sk', currency: 'EUR', title: '€' },
];