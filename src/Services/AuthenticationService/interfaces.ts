import React, { ReactNode } from "react";

export interface IAuthenticationServiceProps {
    children: ReactNode;
}

export interface IAuthUser {
    isLoggedIn: boolean;
    accessToken?: string;
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    iat?: string;  
}

export interface IAuthenticationServiceModel {
    decodeJWTData: (JWTToken: string) => Record<any, any>;
    getUserMe: (JWTToken: string) => void;
    logOut: () => void;
    authUser: IAuthUser;
    checkedAuth: boolean;
}
