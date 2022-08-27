import * as React from 'react';
import { get } from 'lodash-es';
import { Parallax, ParallaxLayer, IParallax } from '@react-spring/parallax';

import MainCarousel from './Components/MainCarousel';

import { DeviceServiceContext } from '../../Services/DeviceService';
import { ProxyServiceContext } from '../../Services/ProxyService/context';

import './styles.css';

const HomePage: React.FC = (): JSX.Element => {
    const deviceServiceContext = React.useContext(DeviceServiceContext);
    const proxyServiceContext = React.useContext(ProxyServiceContext);
    const parallax = React.useRef<IParallax>(null!);
    console.log('deviceServiceContext => ', proxyServiceContext)
    return (
        <div
            className='page-base'
            style={{
                width: `${get(deviceServiceContext, 'layoutWidth', 0)}px`,
                height: `${get(deviceServiceContext, 'layoutHeiht', 0)}px`
            }}
        >
            <Parallax ref={parallax} pages={3}>
                <ParallaxLayer offset={0} speed={1}>
                    <MainCarousel />
                </ParallaxLayer>
                <ParallaxLayer offset={1} speed={2}>
                    <h1>BBBBBBBBBBBBBBBBBBBBB</h1>
                </ParallaxLayer>
                <ParallaxLayer offset={2} speed={1}>
                    <h1>CCCCCCCCCCCCCCCCCCCCCCCC</h1>
                </ParallaxLayer>
            </Parallax>
        </div>
    );
};

export default HomePage;
