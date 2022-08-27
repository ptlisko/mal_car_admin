import * as React from 'react';

import Logo from './Components/Logo';
import Button from './Components/Button';
import LanguageChanger from './Components/LanguageChanger';

import './styles.css';

const Header: React.FC = (): JSX.Element => {
    return (
        <div className='mal-car-header'>
            <Logo />
            <Button
                title="mainMenu.button.name.purchase"
                id="routes.pathname.purchase"
            />
            <Button
                title="mainMenu.button.name.sell"
                id="routes.pathname.sell"
            />
            <Button
                title="mainMenu.button.name.aboutUs"
                id="routes.pathname.aboutUs"
            />
            <Button
                title="mainMenu.button.name.contact"
                id="routes.pathname.contact"
            />
            <LanguageChanger/>
        </div>
    );
};

export default Header;
