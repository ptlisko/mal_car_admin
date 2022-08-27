import * as React from 'react';

export interface IPasswordProps {
    name?: string;
    id?: string;
    type?: string;
    label?: React.ReactNode;
    readonly?: boolean;
    showPasswordToggle?: boolean;
}
