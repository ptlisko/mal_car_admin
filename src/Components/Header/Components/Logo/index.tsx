import * as React from 'react';
import { useNavigate } from 'react-router-dom';

import './styles.css';

const Logo: React.FC = (): JSX.Element => {
    const navigate = useNavigate();
    const handleMoveToHomePage = React.useCallback(() => {
        navigate('/');
    }, []);

    return (
        <div
            className='mal-car-header-logo'
            onClick={handleMoveToHomePage}
        >
            <div className='mal-car-logo-wrap'>
                Mal Car s.r.o.
            </div>
        </div>
    );
};

export default Logo;
