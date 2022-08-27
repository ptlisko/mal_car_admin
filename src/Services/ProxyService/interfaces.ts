import { ReactNode } from "react";

import ProxyService from "../ProxyService";

export interface IProxyService {

}

export interface IProxyServiceContextModel {
    proxyService: ProxyService | null;
}

export interface IProxyServiceProviderProps {
    children: ReactNode;
}
