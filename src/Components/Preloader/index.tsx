import * as React from 'react';

import { IContentPreloaderProps, IStyle } from './interfaces';

const getDefaultStyle = (visible: boolean): IStyle => ({
    display: visible ? 'flex' : 'none'
})

/**
 * @category Component Preloader
 */
const Preloader: React.FC<IContentPreloaderProps> = ({
    height = 60,
    width = 60,
    radius = 1,
    color = 'rgba(0, 0, 0, 1)',
    ariaLabel = 'tail-spin-loading',
    wrapperStyle,
    wrapperClass,
    visible = true
}): JSX.Element => (
    <div
        style={{
            ...getDefaultStyle(visible),
            ...wrapperStyle,
        }}
        className={wrapperClass}
        data-testid="tail-spin-loading"
    >
        <svg
            width={width}
            height={height}
            viewBox="0 0 38 38"
            aria-label={ariaLabel}
            data-testid="tail-spin-svg"
        >
            <defs>
                <linearGradient
                    x1="8.042%"
                    y1="0%"
                    x2="65.682%"
                    y2="23.865%"
                    id="a"
                >
                    <stop
                        stopColor={color}
                        stopOpacity="0"
                        offset="0%"
                    />
                    <stop
                        stopColor={color}
                        stopOpacity=".631"
                        offset="63.146%"
                    />
                    <stop
                        stopColor={color}
                        offset="100%"
                    />
                </linearGradient>
            </defs>
            <g
                fill="none"
                fillRule="evenodd"
            >
                <g transform="translate(1 1)">
                    <path
                        d="M36 18c0-9.94-8.06-18-18-18"
                        id="Oval-2"
                        stroke={color}
                        strokeWidth="2"
                    >
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.4s"
                            repeatCount="indefinite"
                        />
                    </path>
                    <circle fill="black" cx="36" cy="18" r={radius}>
                        <animateTransform
                            attributeName="transform"
                            type="rotate"
                            from="0 18 18"
                            to="360 18 18"
                            dur="0.4s"
                            repeatCount="indefinite"
                        />
                    </circle>
                </g>
            </g>
        </svg>
    </div>
);

export default Preloader;
