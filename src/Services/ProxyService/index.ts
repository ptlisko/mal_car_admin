import Promise from "bluebird";
import Axios, {
    AxiosPromise,
    AxiosResponse,
    AxiosRequestConfig,
    AxiosRequestHeaders,
    AxiosError,
} from "axios";
import { map, isEmpty, get, set } from "lodash-es";
import consoleLog from "node-color-log";
// import { toast } from 'react-toastify';

import { IProxyService } from "./interfaces";

import Config from "../../Config";

import {
    COMMON_CONTENT_TYPE,
    COMMON_ACCEPT,
    UPLOAD_CONTENT_TYPE,
} from './constants';

Promise.config({
    warnings: {
        wForgottenReturn: false
    }
});

/**
 * Proxy Service
 * @class ProxyService
 * @param API_URI string
 * @param ENV string
 */
class ProxyService implements IProxyService {
    private API_URI: string;
    private ENV: string;

    constructor() {
        this.API_URI = `${get(Config, 'proxy.protocol')}://${get(Config, 'proxy.url')}`;
        this.ENV = get(Config, 'environment', 'development');
    }

    /**
     * Function return request config for axios instance
     * @returns returns a config
     */
    private getProxyConfig(accessToken?: string): AxiosRequestConfig {
        const proxyRequestConfig: AxiosRequestConfig = {
            data: null,
        };
        const proxyRequestHeader: AxiosRequestHeaders = {
            'Content-Type': COMMON_CONTENT_TYPE,
            Accept: COMMON_ACCEPT,
        };
        if (accessToken) {
            set(proxyRequestHeader, 'Authentication', accessToken);
        }
        set(proxyRequestConfig, 'headers', proxyRequestHeader);
        

        return proxyRequestConfig;
    }

    /**
     * Function return custom url query
     * @param queryArguments Record with key/value arguments
     * @returns returns custom url query
     */
    private makeQuery(queryArguments?: Record<any, any>): string {
        if (!isEmpty(queryArguments)) {
            return `?${map(
                queryArguments,
                (queryArgument: string | number | boolean, index: string): string => {
                    return `${index}=${queryArgument}`;
                }
            ).join("&")}`;
        }

        return "";
    }

    /**
     * LOG Response to dev console
     * @param response AxiosResponse
     */
    private logResponseToSystemConsole(response: AxiosResponse<any>): void {
        if (this.ENV === "development") {
            consoleLog.info(response);
        }
    }

    /**
     * LOG error to dev console
     * @param error Axios error
     */
    private logErrorToSystemConsole(error: Error): void {
        if (this.ENV === "development") {
            consoleLog.error(error);
            consoleLog.error(error.message);
        }
    }

    /**
     * Get one Entity method
     * @param path string
     * @param requestId number | string | undefined
     * @param queryArguments Record with key/value arguments
     * @param accessToken String Access Token
     * @returns GET Response data or handle Error
     */
    public get(
        path: string,
        requestId?: string | number | undefined,
        queryArguments?: Record<any, any>,
        accessToken?: string,
    ): AxiosPromise {
        return new Promise((resolve: (thenableOrResult?: Record<any, any>) => void, reject: (error?: any) => void) => {
            const query: string = this.makeQuery(queryArguments);
            const proxyRequestConfig: AxiosRequestConfig = this.getProxyConfig(accessToken);

            Axios.get(
                `${this.API_URI}${path}${requestId ? `/${requestId}` : ""
                }${query}`,
                proxyRequestConfig,
            ).then((response: AxiosResponse<any>): void | PromiseLike<void> => {
                this.logResponseToSystemConsole(response);

                return resolve(get(response, "data", {}));
            }
            ).catch((error: AxiosError) => {
                this.logErrorToSystemConsole(error);

                return reject(error);
            });
        });
    }

    /**
     * Get collection method
     * @param path string
     * @param requestId number | string | undefined
     * @param queryArguments Record with key/value arguments
     * @param accessToken String Access Token
     * @returns GET Collection Response data or handle Error
     */
    public getCollection(
        path: string,
        requestId?: string | number | undefined,
        queryArguments?: Record<any, any>,
        accessToken?: string,
    ): AxiosPromise {
        return new Promise((resolve: (thenableOrResult?: Record<any, any>) => void, reject: (error?: any) => void) => {
            const query: string = this.makeQuery(queryArguments);
            const proxyRequestConfig: AxiosRequestConfig = this.getProxyConfig(accessToken);
            const reqId = requestId ? `/${requestId}` : "";

            Axios.get(`${this.API_URI}${path}${reqId}${query}`, proxyRequestConfig)
                .then((response: AxiosResponse<any>): void | PromiseLike<void> => {
                    this.logResponseToSystemConsole(response);

                    return resolve(get(response, "data", {}));
                }
                ).catch((error: AxiosError) => {
                    this.logErrorToSystemConsole(error);

                    return reject(error);
                });
        });
    }

    /**
     * POST method
     * @param path string
     * @param requestData Record<any, any>
     * @param accessToken String Access Token
     * @returns POST Response or handle Error
     */
    public post(
        path: string,
        requestData: Record<any, any>,
        accessToken?: string,
    ): AxiosPromise {
        return new Promise((resolve: (thenableOrResult?: Record<any, any>) => void, reject: (error?: any) => void) => {
            const proxyRequestConfig: AxiosRequestConfig = this.getProxyConfig(accessToken);

            Axios.post(`${this.API_URI}${path}`, requestData, proxyRequestConfig)
                .then((response: AxiosResponse<any>): void | PromiseLike<void> => {
                    this.logResponseToSystemConsole(response);

                    return resolve(get(response, "data"));
                }
                ).catch((error: AxiosError) => {
                    this.logErrorToSystemConsole(error);
                    if (get(error, 'response.data')) {
                        return reject(new Error(get(error, 'response.data')));
                    }

                    return reject(error);
                });
        });
    }

    /**
     * PUT method
     * @param path string
     * @param requestData Record<any, any>
     * @param requestId number | string | undefined
     * @param accessToken String Access Token
     * @returns PUT Response or handle Error
     */
    public put(
        path: string,
        requestData: Record<any, any>,
        requestId?: string | number | undefined,
        accessToken?: string,
    ): AxiosPromise {
        return new Promise((resolve: (thenableOrResult?: Record<any, any>) => void, reject: (error?: any) => void) => {
            const proxyRequestConfig: AxiosRequestConfig = this.getProxyConfig(accessToken);

            Axios.put(
                `${this.API_URI}${path}${requestId ? `/${requestId}` : ""}`,
                requestData,
                proxyRequestConfig,
            ).then((response: AxiosResponse<any>): void | PromiseLike<void> => {
                this.logResponseToSystemConsole(response);

                return resolve(get(response, "data", {}));
            }
            ).catch((error: AxiosError) => {
                this.logErrorToSystemConsole(error);

                return reject(error);
            });
        });
    }

    /**
    * DELETE method
    * @param path string
    * @param requestId number | string | undefined
    * @param queryArguments Record with key/value arguments
    * @param accessToken String Access Token
    * @returns DELETE Response or handle Error
    */
    public delete(
        path: string,
        requestId: number | string | undefined,
        queryArguments?: Record<any, any>,
        accessToken?: string,
    ): AxiosPromise {
        return new Promise((resolve: (thenableOrResult?: Record<any, any>) => void, reject: (error?: any) => void) => {
            const proxyRequestConfig: AxiosRequestConfig = this.getProxyConfig(accessToken);
            const query: string = this.makeQuery(queryArguments);
            const reqId = requestId ? `/${requestId}` : "";

            Axios.delete(`${this.API_URI}${path}${reqId}${query}`, proxyRequestConfig)
                .then((response: AxiosResponse<any>): void | PromiseLike<void> => {
                    this.logResponseToSystemConsole(response);

                    return resolve(response);
                }
                ).catch((error: AxiosError) => {
                    this.logErrorToSystemConsole(error);

                    return reject(error);
                });
        });
    }

    /**
    * FILE UPLOAD method
    * @param path string
    * @param requestId number | string | undefined
    * @param file File
    * @param accessToken String Access Token
    * @returns UPLOAD Response or handle Error
    */
    public upload(
        path: string,
        requestId: number | string | undefined,
        file: File,
        accessToken?: string,
    ): AxiosPromise {
        return new Promise((resolve: (thenableOrResult?: Record<any, any>) => void, reject: (error?: any) => void) => {
            const proxyRequestConfig: AxiosRequestConfig = this.getProxyConfig(accessToken);
            const proxyUploadHeaders: AxiosRequestHeaders = {
                'content-type': UPLOAD_CONTENT_TYPE,
            };
            set(proxyRequestConfig, 'headers', proxyUploadHeaders);
            const formData = new FormData();
            formData.append('file', file)
            const reqId = requestId ? `/${requestId}` : "";

            Axios.post(`${this.API_URI}${path}${reqId}`, formData, proxyRequestConfig)
                .then((response: AxiosResponse<any>): void | PromiseLike<void> => {
                    this.logResponseToSystemConsole(response);

                    return resolve(response);
                }
                ).catch((error: AxiosError) => {
                    this.logErrorToSystemConsole(error);

                    return reject(error);
                });
        });
    }
}

export default ProxyService;
