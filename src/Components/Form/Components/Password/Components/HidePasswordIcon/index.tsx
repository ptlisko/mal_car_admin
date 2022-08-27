import * as React from "react";

const HidePasswordIcon: React.FunctionComponent = (): JSX.Element => {
    return (
        <svg width={22.151} height={18}>
            <g data-name="Group 922">
                <path
                    data-name="Path 197"
                    d="M4.649.368a1.257 1.257 0 10-1.775 1.778l1.937 1.936a15.149 15.149 0 00-2.224 1.993c-3.323 3.6-3.538 3.038-.079 6.809a11.653 11.653 0 008.573 4.005 11 11 0 005.193-1.346l2.089 2.088a1.257 1.257 0 001.778-1.778zm6.425 14.243a5.225 5.225 0 01-5.088-5.3A5.121 5.121 0 017.026 6.3l2 2a2.194 2.194 0 00-.3 1.078 2.254 2.254 0 002.171 2.255h.182a2.2 2.2 0 00.98-.3l2.139 2.139a5.173 5.173 0 01-3.119 1.141"
                />
                <path
                    data-name="Path 198"
                    d="M11.108 4.19a5.2 5.2 0 015.072 5.1v.121l3.458 3.459.02-.021c3.448-3.76 3.234-3.2-.078-6.789a11.4 11.4 0 00-8.468-4.1 10.048 10.048 0 00-2.153.232l2.012 2.012c.047 0 .093-.009.141-.011"
                />
            </g>
        </svg>
    );
}

const MemoHidePasswordIcon = React.memo(HidePasswordIcon);

export default MemoHidePasswordIcon;
