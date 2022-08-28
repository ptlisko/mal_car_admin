import * as React from 'react';

import Logo from './Components/Logo';
import Burger from './Components/Burger';
import Button from './Components/Button';
import LanguageChanger from './Components/LanguageChanger';
import AuthButtons from './Components/AuthButtons';

import './styles.css';

const Header: React.FC = (): JSX.Element => {
    return (
        <div className='mal-car-header'>
            <Burger />
            <Logo />
            <AuthButtons />
            <LanguageChanger/>
        </div>
    );
};

export default Header;
