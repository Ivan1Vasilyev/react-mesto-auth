import { useState } from 'react';
import logo from '../images/logo.svg';
import Navbar from './Navbar';

const Header = props => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggler = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      {isMenuOpen && props.loggedIn && <Navbar {...props} isOpen={isMenuOpen} />}
      <header className="header">
        <img className="header__logo" src={logo} alt="Логотип" />
        <Navbar {...props} />
        {props.loggedIn && (
          <button className={`header__menu ${isMenuOpen && 'header__menu_active'}`} onClick={toggler}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        )}
      </header>
    </>
  );
};

export default Header;
