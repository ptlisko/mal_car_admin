import * as React from 'react';
import { get } from 'lodash-es';

import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';

import DeviceServiceProvider from '../../Services/DeviceService';

import { ILayoutProps } from './interfaces';

import './styles.css';

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps): JSX.Element => {
    return (
        <div className='layout'>
            <Header />
            <Content>
                {get(props, 'children', '')}
            </Content>
            <Footer/>
        </div>
    );
};

const ConnectedLayout: React.FC<ILayoutProps> = (props: ILayoutProps): JSX.Element => {
    return (
        <DeviceServiceProvider>
            <Layout>
                {get(props, 'children', '')}
            </Layout>
        </DeviceServiceProvider>
    );
};

export default ConnectedLayout;
