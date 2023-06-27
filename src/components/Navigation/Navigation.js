import { NavLink } from 'react-router-dom';
import account from '../../images/account.svg';
import './Navigation.css';

function Navigation(props) {

  return (
    <>
      <nav className={`${props.className}__links`}>
        <NavLink to="/" className={({ isActive }) =>
          `${props.className}__link
         ${props.className}__link-movies 
         ${props.className}__link_none 
         ${isActive && `${props.className}__link-movies_active`}`}
          onClick={props.onClose}>Главная
        </NavLink>

        <NavLink to="/movies" className={({ isActive }) =>
          `${props.className}__link 
        ${props.className}__link-movies 
        ${isActive && `${props.className}__link-movies_active`}`}
          onClick={props.onClose}>Фильмы
        </NavLink>

        <NavLink to="/saved-movies" className={({ isActive }) =>
          `${props.className}__link 
        ${props.className}__link-movies 
        ${isActive && `${props.className}__link-movies_active`}`}
          onClick={props.onClose}>Сохранённые&nbsp;фильмы
        </NavLink>
      </nav>

      <NavLink to="/profile" className={`${props.className}__link 
      ${props.className}__link-account`}
        onClick={props.onClose}>
        <div className="account">Аккаунт
          <img className="account__image" src={account} alt="иконка аккаунта" />
        </div>
      </NavLink>
    </>
  );
}

export default Navigation;