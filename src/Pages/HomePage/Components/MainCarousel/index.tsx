import * as React from 'react';
import { Carousel } from 'react-responsive-carousel';

import { DeviceServiceContext } from '../../../../Services/DeviceService';

import './styles.css';

const previewMain1 = require('../../../../Assets/Images/home_page_main1.png');
const previewMain2 = require('../../../../Assets/Images/home_page_main2.png');
const MainCarousel: React.FC = (): JSX.Element => {
    const deviceServiceContext = React.useContext(DeviceServiceContext);

    return (
        <div
            className='main-carousel'
            style={{
                height: `${deviceServiceContext.layoutHeiht - 100}px`
            }}
        >
            <Carousel
                dynamicHeight
            >
                <div 
                    className='main-carousel-overlay'
                    style={{
                        height: `${deviceServiceContext.layoutHeiht - 100}px`,
                    }}
                >
                    <img
                        src={previewMain1}
                        style={{
                            height: `${deviceServiceContext.layoutHeiht - 100}px`,
                            width: `${deviceServiceContext.layoutHeiht * 1.7}px`
                        }}
                    />
                    <p className="legend">Legend 1</p>
                </div>
                <div>
                    <img
                        src={previewMain2}
                        style={{
                            height: `${deviceServiceContext.layoutHeiht - 100}px`,
                            width: `${deviceServiceContext.layoutHeiht * 1.1}px`
                        }}
                    />
                    <p className="legend">Legend 2</p>
                </div>
                <div>
                    <img
                        src={previewMain1}
                        // style={{
                        //     height: `${deviceServiceContext.layoutHeiht - 100}px`
                        // }}
                    />
                    <p className="legend">Legend 3</p>
                </div>
            </Carousel>
        </div>
    );
};

export default MainCarousel;
