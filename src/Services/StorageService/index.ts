import { get, set, unset } from 'lodash-es';

import Config from '../../Config';

let temp = {};

/**
 * Local Storage Service
 * @class StorageServices
 */
class StorageService {
    private ENV: string = get(Config, "environment", "development");

    private storageTestKey: string = 'STORAGE_TEST_KEY';

    private storageDefaultValue: string = 'STORAGE_DEFAUT_VALUE';

    /**
     * A method that checks availability of Local Storage in current Browser
     * @returns Boolean result
     */
    private isStorageAvailable() {
        try {
            localStorage.setItem(this.storageTestKey, this.storageTestKey);
            localStorage.removeItem(this.storageTestKey);
            return true;
        } catch (e) {
            return false;
        }
    }

    /**
     * A method that deletes all records in the local storage
     * @returns void
     */
    public clearStorage() {
        if (this.isStorageAvailable())
            localStorage.clear();
        temp = {};
    }

    /**
     * A method that returns one record from a local storage by index
     * @returns Required value - Record <any, any>| string | number | boolean | any[] | null
     */
    public getStorageItem(itemName = '', defaultValue = this.storageDefaultValue): Record<any, any> | string | number | boolean | any[] | null {
        if (this.isStorageAvailable()) {
            const storedValue = localStorage.getItem(`MAL_CAR_FRONTEND_${this.ENV}_${itemName}`);
            const valueObject = storedValue ? JSON.parse(storedValue) : null;
            if (!valueObject) {
                if (defaultValue !== this.storageDefaultValue) {
                    this.setItem(`MAL_CAR_FRONTEND_${this.ENV}_${itemName}`, defaultValue);

                    return defaultValue;
                }
                return null;
            }
            if (valueObject.hasOwnProperty('value')) {
                if (valueObject.value === null && defaultValue !== this.storageDefaultValue) {
                    this.setItem(`MAL_CAR_FRONTEND_${this.ENV}_${itemName}`, defaultValue);

                    return defaultValue;
                }

                return valueObject.value;
            }
            return null;
        } else {
            if (temp.hasOwnProperty(`${this.ENV}_${itemName}`)) {
                return get(temp, `MAL_CAR_FRONTEND_${this.ENV}_${itemName}`);
            } else if (defaultValue !== this.storageDefaultValue) {
                set(temp, `MAL_CAR_FRONTEND_${this.ENV}_${itemName}`, defaultValue);

                return defaultValue;
            }
            return null;
        }
    }

    /**
     * A method that remove one record from a local storage by index
     * @returns Result - boolean
     */
    public removeItem(itemName = '') {
        if (this.isStorageAvailable())
            localStorage.removeItem(`MAL_CAR_FRONTEND_${this.ENV}_${itemName}`);
        else if (temp.hasOwnProperty(`MAL_CAR_FRONTEND_${this.ENV}_${itemName}`)) {
            unset(temp, `MAL_CAR_FRONTEND_${this.ENV}_${itemName}`);
        }

        return true;
    }

    /**
     * A method that create one record in local storage by provided index and value
     * @returns Stored value - Record <any, any>| string | number | boolean | any[] | null
     */
    public setItem(
        itemName = '',
        itemValue: Record<any, any> | string | number | boolean | any[] | null
    ): Record<any, any> | string | number | boolean | any[] | null {
        if (this.isStorageAvailable()) {
            const valueToBeSerialized = { value: itemValue };
            const serializedValue = JSON.stringify(valueToBeSerialized);
            localStorage.setItem(`MAL_CAR_FRONTEND_${this.ENV}_${itemName}`, serializedValue);
        } else {
            set(temp, `MAL_CAR_FRONTEND_${this.ENV}_${itemName}`, itemValue);
        }

        return itemValue;
    }
}

export default StorageService;
