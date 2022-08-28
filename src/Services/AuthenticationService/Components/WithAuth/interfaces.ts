import { ReactNode } from "react";

export interface IWithAuthProps {
    children: ReactNode;
    allowHost: boolean;
    allowAuthenticated: boolean;
}
