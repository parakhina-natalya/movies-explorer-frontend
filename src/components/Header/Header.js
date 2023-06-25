import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Menu from '../Menu/Menu.js';
import Navigation from '../Navigation/Navigation';
import './Header.css';


function Header(props) {

  return (
    <header className="header">
      {!props.loggedIn ?
        <div className="header__container">
          <Logo />
          <nav className="header__nav header__nav_welcome">
            <Link to="/signup" className="header__link header__link-welcome">Регистрация</Link>
            <Link to="/signin" className="header__link header__link-welcome header__link_button">Войти</Link>
          </nav>
        </div>
        :
        <div className="header__container">
          <Logo />
          <div className="hamburger" onClick={props.onHamburger}>
            <div className="hamburger__container" >
              <span className="hamburger__line"></span>
              <span className="hamburger__line"></span>
              <span className="hamburger__line"></span>
            </div>
          </div>
          {!props.isOpen ?
            < div className="header__nav header__nav_movies">
              <Navigation className="header"></Navigation>
            </div>
            :
            <Menu isOpen={props.isOpen}
              onClose={props.onClose} />
          }
        </div>
      }
    </header >
  );
}

export default Header;