import * as React from "react";

const ShowPasswordIcon: React.FunctionComponent = (): JSX.Element => {
    return (
        <svg width={22.151} height={14.927}>
            <g data-name="Group 921">
                <path
                    data-name="Path 195"
                    d="M19.568 4.113A11.431 11.431 0 0011.076 0a11.431 11.431 0 00-8.492 4.113c-3.323 3.6-3.537 3.038-.079 6.809a11.649 11.649 0 008.571 4.005 11.649 11.649 0 008.571-4.005c3.458-3.771 3.244-3.21-.079-6.809m-8.492 8.535a5.206 5.206 0 010-10.409 5.206 5.206 0 010 10.409"
                    fill="rgba(0,0,0,0.5)"
                />
                <path
                    data-name="Path 196"
                    d="M11.076 5.221c-.043 0-.086-.007-.129-.006a2.229 2.229 0 00-.052 4.457h.182a2.226 2.226 0 000-4.446"
                    fill="rgba(1,1,1,0.5)"
                />
            </g>
        </svg>
    );
}

const MemoShowPassword = React.memo(ShowPasswordIcon);

export default MemoShowPassword;
