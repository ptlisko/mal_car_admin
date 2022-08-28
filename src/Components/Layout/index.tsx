import * as React from 'react';
import { get } from 'lodash-es';

import Header from '../Header';
import Content from '../Content';
import Footer from '../Footer';

import SideBarContextProvider from '../SideBar/context';

import { ILayoutProps } from './interfaces';

import './styles.css';

const Layout: React.FC<ILayoutProps> = (props: ILayoutProps): JSX.Element => {
    return (
        <div className='layout'>
            <SideBarContextProvider>
                <Header />
                <Content>
                    {get(props, 'children', '')}
                </Content>
                <Footer />
            </SideBarContextProvider>
        </div>
    );
};

export default Layout;
