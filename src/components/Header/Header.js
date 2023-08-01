import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import Hamburger from '../Hamburger/Hamburger.js';
import Navigation from '../Navigation/Navigation';
import './Header.css';


function Header(props) {
  return (
    <header className="header">
      {!props.loggedIn ? (
        <div className="header__container">
          <Logo />
          <nav className="header__nav header__nav_welcome">
            <Link to="/signup" className="header__link header__link-welcome">Регистрация</Link>
            <Link to="/signin" className="header__link header__link-welcome header__link_button">Войти</Link>
          </nav>
        </div>
      ) : (
        <div className="header__container">
          <Logo />
          <button className="header__hamburger-button" onClick={props.onHamburger}>
            <div className="header__hamburger-container" >
              <span className="header__hamburger-line"></span>
              <span className="header__hamburger-line"></span>
              <span className="header__hamburger-line"></span>
            </div>
          </button>
          {!props.isOpen ? (
            < div className="header__nav header__nav_movies">
              <Navigation className="header"></Navigation>
            </div>
          ) : (
            <Hamburger isOpen={props.isOpen}
              onClose={props.onClose} />
          )}
        </div>)
      }
    </header >
  );
}

export default Header;