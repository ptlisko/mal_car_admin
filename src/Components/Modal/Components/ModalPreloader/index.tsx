import * as React from 'react';

import Preloader from '../../../Preloader';

import './styles.css';

const ModalPreloader: React.FC = (): JSX.Element => {
    return (
        <div
            className='modal-preloader'
        >
            <Preloader />
        </div>
    );
};

export default ModalPreloader;
