import * as React from 'react';

const usePrevious = (value: any): any => {
    const ref = React.useRef();
    React.useEffect(() => {
        ref.current = value;
    }, [value]);

    return ref.current;
};

export default usePrevious;
